import React, { useEffect, useState } from 'react'
import SideNavBar from '../../component/sidenav/SideNavBar'
import Nav from '../../component/nav/Nav'
import Table from './Table'
import { useParams } from 'react-router-dom'

const TopKhabre = () => {
    
    const params = useParams()
    const [position, setPosition] = useState('');
    useEffect(() => {
        setPosition(params.categories);
    }, [params])

    return (
        <Table position={position} />
    )
}

export default TopKhabre
