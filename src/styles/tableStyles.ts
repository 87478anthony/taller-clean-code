import { css } from 'lit';

export const tableStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  .table-container {
    width: 50rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .table-header, .table-row {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    padding: 1rem;
    align-items: center;
    justify-items: center;
  }

  .table-header__item {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    color: #333;
  }

  .table-row__item {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  .table-row__item.management {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    color: blue;
    font-weight: 500;
  }

  .table-row__item.management:hover {
    cursor: pointer;
  }

  .button-create,
  .create-office__submit {
    margin-top: 1rem;
    padding: 1rem 2rem;
    border-radius: 1rem;
    border: none;
    outline: none;
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    background-color: #09aefb;
    color: #fff;
    box-shadow: 2px 0px 20px rgba(0, 0, 0, 0.2);
  }

  .button-create:hover,
  .create-office__submit {
    cursor: pointer;
    transform: translateY(-1px);
  }

  .button-create:active,
  .create-office__submit {
    transform: translateY(0px);
  }

  dialog {
    padding: 0;
    margin: 0;
  }

  dialog:modal {
    max-width: 100vw;
    max-height: 100vh;
  }

  .dialog-office {
    margin: auto;
    padding: 3rem;
    border-radius: 1rem;
    border: 1px solid #ccc;
  }

  .dialog-office__form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .dialog-office__input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-family: 'Roboto', sans-serif;
  }

  .dialog-office__input label {
    font-weight: 700;
    font-size: 1.2rem;
    color: #333;
  }
    

  .dialog-office__input input {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.5rem;
    font-size: 1rem;
  }

  .dialog-office__input:last-child {
    grid-column: span 2;
  }
`;
