import { TSElement } from '@tradeshift/elements';
import css from './button.css';

const [$type, $grouped] = [Symbol('type'), Symbol('grouped')];

const BaseElement = TSElement('Button');

class Button extends BaseElement {
	static get observedAttributes() {
		return ['type', 'grouped'];
	}
	static get tagName() {
		return 'ts-button';
	}
	static get html() {
		return `
			<button>
				<span>
					<slot></slot>
				</span>
			</button>
		`;
	}
	static get css() {
		return css;
	}

	createdCallback() {
		this.type = this.getAttribute('type');
		this.grouped = this.getAttribute('grouped');
	}

	get type() {
		return this[$type];
	}
	set type(type) {
		if (type === this[$type]) {
			return;
		}

		this[$type] = type;
		this[type ? 'setAttribute' : 'removeAttribute']('type', type);
		this.shadowRoot
			.querySelector('button > span')
			.classList.toggle('title', this.type !== 'text');
	}
	get grouped() {
		return this[$grouped];
	}
	set grouped(grouped) {
		if (grouped === this[$grouped]) {
			return;
		}

		this[$grouped] = grouped;
		this[grouped ? 'setAttribute' : 'removeAttribute']('grouped', grouped);
	}
}

BaseElement.init(Button);
