const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const pageDir = path.join(__dirname, '../look-up-foundation');
const source = fs.readFileSync(process.env.SCRIPT_PATH || path.join(pageDir, 'script.js'), 'utf8');
const html = fs.readFileSync(path.join(pageDir, 'index.html'), 'utf8');

// Exercise the real script's registered handlers without requiring browser packages.
// Native input validity, Bootstrap collapse and layout need separate browser checks.
function setup(hrefs = [...html.matchAll(/<a\b[^>]*href="(#[^"]*)"/g)].map(m => m[1])) {
    const scrolls = [];
    const alerts = [];
    const nodes = new Map([...html.matchAll(/\bid="([^"]+)"/g)].map(m => [
        m[1], { value: '', textContent: '', scrollIntoView: options => scrolls.push([m[1], options.behavior]) }
    ]));
    let submit;
    nodes.get('donation-form').addEventListener = (event, handler) => { submit = handler; };
    const anchors = hrefs.map(href => ({
        getAttribute: () => href,
        addEventListener(event, handler) { this.click = handler; }
    }));
    const context = {
        document: {
            getElementById: id => nodes.get(id) || null,
            querySelectorAll: () => anchors,
            querySelector: selector => {
                if (selector === '#') throw new SyntaxError('Invalid selector');
                return nodes.get(selector.slice(1)) || null;
            }
        },
        alert: message => alerts.push(message)
    };
    vm.runInNewContext(source, context);
    function event() {
        return { defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
    }
    return {
        nodes, scrolls, alerts,
        click(index) { const e = event(); anchors[index].click(e); return e; },
        submit(value) { nodes.get('amount').value = value; const e = event(); submit(e); return e; }
    };
}

test('actual logo placeholder is safe and retains native navigation', () => {
    const page = setup();
    assert.equal(page.click(0).defaultPrevented, false);
    assert.deepEqual(page.scrolls, []);
});

test('every actual section link smooth-scrolls to its existing target', () => {
    const hrefs = [...html.matchAll(/<a\b[^>]*href="(#[^"]*)"/g)].map(m => m[1]);
    const page = setup(hrefs);
    hrefs.forEach((href, index) => {
        if (href === '#') return;
        assert.equal(page.click(index).defaultPrevented, true, href);
        assert.deepEqual(page.scrolls.at(-1), [href.slice(1), 'smooth']);
    });
});

for (const href of ['#missing', '#[', '#%', '#%E0%A4%A']) {
    test('invalid or missing fragment is safe: ' + href, () => {
        const page = setup([href]);
        assert.equal(page.click(0).defaultPrevented, false);
        assert.deepEqual(page.scrolls, []);
    });
}

for (const [href, id] of [['#section:one', 'section:one'], ['#two%20words', 'two words']]) {
    test('section IDs support punctuation and encoded characters: ' + href, () => {
        const page = setup([href]);
        page.nodes.set(id, { scrollIntoView: options => page.scrolls.push([id, options.behavior]) });
        assert.equal(page.click(0).defaultPrevented, true);
        assert.deepEqual(page.scrolls, [[id, 'smooth']]);
    });
}

for (const amount of ['1', '10', '100']) {
    test('positive amount only confirms entry: ' + amount, () => {
        const page = setup();
        assert.equal(page.submit(amount).defaultPrevented, true);
        assert.deepEqual(page.alerts, ['Amount entered: $' + amount + '. This form does not process payments.']);
        assert.equal(page.nodes.get('impact-text').textContent,
            'Impact estimates are unavailable until a documented calculation method is provided.');
    });
}

for (const amount of ['', '0', '-1']) {
    test('empty/nonpositive amount never confirms payment: ' + JSON.stringify(amount), () => {
        const page = setup();
        page.nodes.get('impact-text').textContent = 'unchanged';
        assert.equal(page.submit(amount).defaultPrevented, true);
        assert.deepEqual(page.alerts, []);
        assert.equal(page.nodes.get('impact-text').textContent, 'unchanged');
    });
}
