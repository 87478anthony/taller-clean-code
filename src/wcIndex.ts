import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import axios from 'axios';
import { BranchOffice, Offices } from './interfaces/officesInterface';
import { tableStyles } from './styles/tableStyles';

@customElement('wc-index')
export class WcIndex extends LitElement {
  constructor() {
    super();
  }

  static styles = [tableStyles];

  @property()
  private offices: Offices[] = [];

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    const { data } = await axios.get<BranchOffice>('http://localhost:3000/api/get-json-data');
    this.offices = data.branchOffice;
  }

  getTableTemplate(): TemplateResult {
    return html` <div class="table-container">
      <div class="table-header">
        <div class="table-header__item">Address</div>
        <div class="table-header__item">Code</div>
        <div class="table-header__item">Currency</div>
        <div class="table-header__item">Description</div>
        <div class="table-header__item">Identification</div>
        <div class="table-header__item"></div>
      </div>

      <div class="table-content">${this.offices.map(this.getTableResults)}</div>

      <div class="table-footer">
        <button class="table-footer__button">Crear</button>
      </div>
    </div>`;
  }

  getTableResults({
    address,
    code,
    currency,
    description,
    identification,
  }: Offices): TemplateResult {
    return html`
      <div class="table-row">
        <div class="table-row__item">${address}</div>
        <div class="table-row__item">${code}</div>
        <div class="table-row__item">${currency}</div>
        <div class="table-row__item">${description}</div>
        <div class="table-row__item">${identification}</div>
        <div class="table-row__item management">
          <span class="management__action">[Ver]</span>
          <span class="management__action">[Borrar]</span>
        </div>
      </div>
    `;
  }

  protected render(): TemplateResult {
    return this.getTableTemplate();
  }
}
