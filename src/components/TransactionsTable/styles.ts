import styled from "styled-components";

export const Container = styled.div`
   margin-top: 2rem;

   table {
      width: 100%;
      border-spacing: 0 1rem;
   };

   tr {
         height: 3.4rem;
      }

   thead {
      color: var(--text-body);
      text-align: left;

      th {
         padding: 0 1.5rem;
      }
   }

   td {
      padding: 0 1.5rem;
      background: var(--shape);
      color: var(--text-title);

      &.title{
         color: var(--text-title);
         font-weight: 500;
      }

      &.withdraw{
         color: #e52e40
      }

      &.deposit{
         color: #33cc95
      }
   }
`