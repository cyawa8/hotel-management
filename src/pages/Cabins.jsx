import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabins from "../features/cabins/AddCabins";
import CabinTableOperation from "../features/cabins/CabinTableOperation";


function Cabins() {
  // useEffect(function(){
  //   getCabins().then((data)=>console.log(data));
  // }, [])

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <CabinTableOperation />
    </Row>

    <Row>
      <AddCabins />
      <CabinTable />
    </Row>
    </>
  );
}

export default Cabins;
