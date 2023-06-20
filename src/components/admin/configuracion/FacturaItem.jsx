import { Receipt } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react'

function FacturaItem({ id_factura, handleVerFactura }) {

    const [loadingPdf, setLoadingPdf] = useState(false);

    const handleClick = () => {
        setLoadingPdf(true);
        handleVerFactura(id_factura)
            .finally(() => setLoadingPdf(false));
    };

    return (
        <LoadingButton
            key={id_factura}
            size="large"
            color="inherit"
            onClick={handleClick}
            loading={loadingPdf}
            variant="text"
        >
            <Receipt />
        </LoadingButton>
    );

}

export default FacturaItem