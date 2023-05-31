import { LitElement, PropertyValueMap, TemplateResult, html } from 'lit';
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

  @property({ state: true, type: Array })
  private offices: Offices[] = [];

  @property({ state: true })
  private modal: HTMLDialogElement | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.getOfficesData();
  }

  async getOfficesData(): Promise<void> {
    const { data } = await axios.get<BranchOffice>('http://localhost:3000/api/get-json-data');
    this.offices = data.branchOffice;
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.firstUpdated(_changedProperties);
    this.modal = <HTMLDialogElement>(this.shadowRoot?.getElementById('create-office'));
  }

  openModal(): void {
    this.modal?.showModal();
  }

  async submitData(e: Event): Promise<void> {
    e.preventDefault();
    const form = <HTMLFormElement>(this.shadowRoot?.getElementById('dialog-create-office'));
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    await axios.post('http://localhost:3000/api/add-new-office', data);
    this.cleanInputValues();
    this.getOfficesData();
    this.modal?.close();
  }

  cleanInputValues(): void {
    const form = <HTMLFormElement>(this.shadowRoot?.getElementById('dialog-create-office'));
    form.reset();
  }

  getTableTemplate(): TemplateResult {
    return html`
      <div class="table-container">
        <div class="table-header">
          <div class="table-header__item">Address</div>
          <div class="table-header__item">Code</div>
          <div class="table-header__item">Currency</div>
          <div class="table-header__item">Description</div>
          <div class="table-header__item">Identification</div>
          <div class="table-header__item"></div>
        </div>

        <div class="table-content">
          ${this.offices.map(this.getTableResults)}
        </div>
      </div>

      <button @click="${this.openModal}" class="button-create">Crear</button>
    `;
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
    return html`

      ${this.getTableTemplate()}
      <dialog id="create-office" class="dialog-office">

        <form action="" method="POST" id="dialog-create-office">
          
          <div class="dialog-office__form">
            <div class="dialog-office__input">
              <label>Address</label>
              <input
                required
                name="address"
                type="text"
                placeholder="Escriba la dirección aquí..."
              />
            </div>

            <div class="dialog-office__input">
              <label>Code</label>
              <input
                required
                name="code"
                type="text"
                placeholder="Escriba el código aquí..."
              />
            </div>
          

            <div class="dialog-office__input">
              <label>Currency</label>
              <input
                required
                name="currency"
                type="text"
                placeholder="Escriba la moneda aquí..."
              />
            </div>

            <div class="dialog-office__input">
              <label>Description</label>
              <input
                required
                name="description"
                type="text"
                placeholder="Escriba la descripción aquí..."
              />
            </div>
          

            <div class="dialog-office__input">
              <label>Identification</label>
              <input
                required
                name="identification"
                type="text"
                placeholder="Escriba la identificación aquí..."
              />
            </div>
          </div>

          <button @click="${this.submitData}" type="submit" class="create-office__submit">Create Office</button>
        </form>
      </dialog>
    `;
  }
}
