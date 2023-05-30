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
`;
