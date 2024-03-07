import React, { useEffect, useState } from 'react'

import SideNavBar from '../../component/sidenav/SideNavBar'
import Nav from '../../component/nav/Nav'
import Table from './Table'
import { useParams } from 'react-router-dom'

const Poll = () => {
    const params = useParams()
    const [categories, setcategories] = useState('');
    useEffect(() => {
        setcategories(params.categories);
    }, [params])
    return (
        <main>
            <div className="wrapper">
                <Table categories={categories} />
            </div>
        </main>
    )
}

export default Poll