import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function CabinTableOperation() {
    return (
        <div>
            <TableOperations>
                <Filter filterField="discount" options={[ 
                    {value: 'all', label: 'All'},
                    {value: 'no-discount', label: 'No Discount'}, 
                    {value: 'with-discount', label: 'With Discount'} 
                ]} />
            </TableOperations>

            <SortBy options={[
                {value : 'name-asc', label: 'Sort by A - Z'},
                {value : 'name-desc', label: 'Sort by Z - A'},
                {value : 'price-asc', label: 'Sort by low price'},
                {value : 'price-desc', label: 'Sort by high price'},
                {value : 'capacity-asc', label: 'Sort by small capacity'},
                {value : 'capacity-desc', label: 'Sort by large capacity'},
            ]}/>
        </div>
    )
}

export default CabinTableOperation
