import { useState, useEffect } from 'react';
import { FormatMoney } from '../../../utils/FormatInputForms';
import Paper from '@mui/material/Paper';
import OverdueIcon from '../../../assets/overdue-charges-icon.svg';
import PaidIcon from '../../../assets/paid-charges-icon.svg';
import UpcomingIcon from '../../../assets/upcoming-charges-icon.svg';
import './ChargesHome.css';

function ChargesHome({ charge, chargesData }) {
    const [chargeData, setChargeData] = useState({
        paid: {
            icon: PaidIcon,
            title: 'Paid Charges',
            amount: '',
        },
        overdue: {
            icon: OverdueIcon,
            title: 'Overdue Charges',
            amount: '',
        },
        upcoming: {
            icon: UpcomingIcon,
            title: 'Upcoming Charges',
            amount: '',
        },
    });

    const filterPaidClients = () => {
        return chargesData.filter(charge => {
            return charge.status === 1;
        });
    };

    const filterPendingClients = () => {
        const currentDate = Date.now();
        return chargesData.filter(charge => {
            const dueDate = new Date(charge.due_date).getTime();
            return charge.status === 0 && dueDate < currentDate;
        });
    };

    const filterExpectedClients = () => {
        const currentDate = Date.now();
        return chargesData.filter(charge => {
            const dueDate = new Date(charge.due_date).getTime();
            return charge.status === 0 && dueDate > currentDate;
        });
    };

    useEffect(() => {
        const paidClients = filterPaidClients();
        const pendingClients = filterPendingClients();
        const expectedCleints = filterExpectedClients();

        const chargesDataLocal = {
            paidAmount: paidClients.reduce((accumulator, object) => {
                return accumulator + object['value'];
            }, 0),
            overdueAmount: pendingClients.reduce((accumulator, object) => {
                return accumulator + object['value'];
            }, 0),
            upcomingAmount: expectedCleints.reduce((accumulator, object) => {
                return accumulator + object['value'];
            }, 0),
        };
        updateChargeData(chargesDataLocal);
    }, [chargesData]);

    const updateChargeData = chargesData => {
        const updateAmount = {
            ...chargeData,
            paid: { ...chargeData.paid, amount: chargesData.paidAmount },
            overdue: { ...chargeData.overdue, amount: chargesData.overdueAmount },
            upcoming: { ...chargeData.upcoming, amount: chargesData.upcomingAmount },
        };
        setChargeData(updateAmount);
    };

    return (
        <section className="content-cards-home">
            <Paper elevation={2} className={`cards-home ${charge}`}>
                <img src={chargeData[charge].icon} alt={chargeData[charge].title} />
                <div className="text-card-home">
                    <h3>{chargeData[charge].title}</h3>
                    <span>{FormatMoney(chargeData[charge].amount)}</span>
                </div>
            </Paper>
        </section>
    );
}

export default ChargesHome;
