// import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;


function CabinTable() {
  const {isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey : ['cabins'],
    queryFn : getCabins,
  });
  const [search] = useSearchParams();

  if (error) return <div>Error loading cabins: {error.message}</div>;

  if(isLoading) return <Spinner />;

  // Filter

  const filterValue = search.get('discount') || "all";
  console.log(filterValue);


  let filteredCabins;
  switch (filterValue) {
    case "no-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      break;
    case "with-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      break;
    default: // "all" atau nilai lain
      filteredCabins = cabins;
  }

  // Sort
  const sortBy = search.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split("-")
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a,b) => (a[field] - b[field]) * modifier);

  return (
  <Menus>
   <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
    <Table.Header>
      <div></div>
      <div>Cabin</div>
      <div>Capacity</div>
      <div>Price</div>
      <div>Discount</div>
      <div></div>
    </Table.Header>
    <Table.Body data={sortedCabins} render={(cabin)=><CabinRow cabin={cabin} key={cabin.id}/>} />
   </Table>
  </Menus>
  )
}

export default CabinTable

