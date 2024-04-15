import React, { useEffect, useState } from 'react'

import Table from './Table'
import { useParams } from 'react-router-dom'

const Adverd = () => {
    const params = useParams()
    const [categories, setcategories] = useState('');
    useEffect(() => {
        setcategories(params.categories);
    }, [params])
    return (
        <Table categories={categories} />
    )
}

export default Adverd
