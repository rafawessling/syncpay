import { TableCell, TableRow } from '@mui/material';
import NotFound from '../../assets/filter-not-found.svg';
import './FilterNotFound.css';

function FilterNotFound() {
    return (
        <TableRow className="container-detail-charges-data container-filter-not-found">
            <TableCell colSpan={7}>
                <div className="content-filter-not-found">
                    <img src={NotFound} alt="Image filter not found" className="image-filter-not-found" />
                    <h3 className="text-filter-not-found">No results were found!</h3>
                    <h4 className="small-text-filter-not-found">Check if writing is correct</h4>
                </div>
            </TableCell>
        </TableRow>
    );
}

export default FilterNotFound;
