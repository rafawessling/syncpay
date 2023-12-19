import { useState } from 'react';
import { useClientsContext } from '../../context/clientsContext';
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterIcon from '../../assets/filter-icon.svg';
import './HeaderDashboard.css';

function HeaderDashboard({ title, icon, setSearchData }) {
    const { setRegisterClient } = useClientsContext();
    const [search, setSearch] = useState('');

    const SearchDashboard = async () => {
        setSearchData(search);
    };

    return (
        <header className="container-header-dashboard">
            <section className="left-side-header">
                <img src={icon} alt="" />
                <h2 className="title-header-dashboard">{title}</h2>
            </section>
            <section className="right-side-header">
                {title === 'Clients' && (
                    <Button className="btn-add-client" variant="contained" onClick={() => setRegisterClient(true)}>
                        + Add Client
                    </Button>
                )}
                {(title === 'Clients' || title === 'Charges') && (
                    <section className="filter-search-section">
                        <div className="container-filter-icon">
                            <img src={FilterIcon} alt="Filter icon" />
                        </div>
                        <TextField
                            className="search-field"
                            id="outlined-search"
                            label="Search"
                            type="text"
                            variant="outlined"
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value);
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" onClick={SearchDashboard}>
                                        <SearchIcon
                                            style={{
                                                cursor: 'pointer',
                                                zIndex: 2,
                                                scale: '1.3',
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </section>
                )}
            </section>
        </header>
    );
}

export default HeaderDashboard;
