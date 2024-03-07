import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate } from 'react-router-dom'


const AddRajyonKhabarain = () => {
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()


    async function FormSubmit(event) {

        event.preventDefault();

        console.log(inputs.file)

        const formData = await new FormData();
        formData.append('heading', inputs.heading);
        formData.append('subheading', inputs.subheading);
        formData.append('shortdesc', inputs.shortdesc);
        formData.append('file', inputs.file);

        console.log(formData)

        // let result = await fetch('http://localhost:5000/api/home/banner', {
        //     method: 'POST',
        //     body: formData,
        // });
        // alert("data has set", result);

        let newres = await ApiCalls('home/banner', 'POST', formData).then(() => {
            alert("data add successfully")
            navigate('/');
        })


    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    const imagehandler = (event) => {
        const value = event.target.files[0];
        const name = event.target.name;
        setInputs({ ...inputs, [name]: value })
    }

    return (
        <Container>
            <Row>
                <Col lg='12'>
                    <div className="bg-dark mt-2"><h4 className='text-white p-2 text-center'>ADD SHUBHKAMNA SANDESH LINKS</h4></div>
                    <form
                        name="sform"
                        id="sform"
                        encType="multipart/form-data"
                        method="post"
                        action="./SaveRajyonKiKhabarainDetails"
                    >
                        <table
                            width={700}
                            height={775}
                            border={0}
                            align="center"
                            cellPadding={5}
                            cellSpacing={5}
                            className="table"
                            style={{ borderStyle: "solid" }}
                        >
                            <thead className="thead">
                                <tr className="thead">
                                    <td colSpan={3}>
                                        <div align="center">RAJYON KI KHABARAIN</div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td width={157} height={32} className="Label">
                                        <div align="left">Select State</div>
                                    </td>
                                    <td width={543} colSpan={2}>
                                        <div align="left">
                                            <select
                                                name="linksno"
                                                tabIndex={1}
                                                id="linksno"
                                                fdprocessedid="mdpqoa"
                                            >
                                                <option value={1}>उत्तर-प्रदेश</option>
                                                <option value={2}>दिल्ली, राष्ट्रीय राजधानी क्षेत्र</option>
                                                <option value={3}>महाराष्ट्र</option>
                                                <option value={4}>उत्तराखंड</option>
                                                <option value={5}>बिहार</option>
                                                <option value={6}>झारखंड</option>
                                                <option value={7}>छत्तीसगढ़</option>
                                                <option value={8}>मध्यप्रदेश</option>
                                                <option value={9}>असम</option>
                                                <option value={10}>आंध्र प्रदेश/तेलंगाना</option>
                                                <option value={11}>गोवा</option>
                                                <option value={12}>गुजरात</option>
                                                <option value={13}>हरियाणा</option>
                                                <option value={14}>हिमाचल प्रदेश</option>
                                                <option value={15}>जम्मू-कश्मीर और लद्दाख</option>
                                                <option value={16}>चंडीगढ़</option>
                                                <option value={17}>कर्नाटक</option>
                                                <option value={18}>पंजाब</option>
                                                <option value={19}>राजस्थान</option>
                                                <option value={20}>पश्चिम बंगाल</option>
                                                <option value={21}>अरुणांचल</option>
                                                <option value={22}>मणिपुर</option>
                                                <option value={23}>मेघालय</option>
                                                <option value={24}>मिजारोम</option>
                                                <option value={25}>तमिलनाडु</option>
                                                <option value={26}>उड़ीसा</option>
                                                <option value={27}>पांडिचेरी</option>
                                                <option value={28}>केरल</option>
                                                <option value={29}>लक्ष्यद्वीप</option>
                                                <option value={30}>सिक्किम</option>
                                                <option value={31}>नागालैंड</option>
                                                <option value={32}>त्रिपुरा</option>
                                                <option value={33}>दमन और दीव</option>
                                                <option value={34}>अंडवार निकोबार द्वीप समूह</option>
                                                <option value={35}>दादर नगर हवेली</option>
                                            </select>
                                        </div>{" "}
                                    </td>
                                </tr>
                                <tr>
                                    <td height={23} className="Label">
                                        <div align="left">Reporter's Image</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                name="reporterimage"
                                                type="file"
                                                className="TextArea"
                                                id="reporterimage"
                                                size={60}
                                                maxLength={70}
                                            />
                                        </div>{" "}
                                    </td>
                                </tr>
                                <tr>
                                    <td height={31} className="Label">
                                        <div align="left">Reporter's Name</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                name="reportername"
                                                type="text"
                                                className="TextField"
                                                id="reportername"
                                                tabIndex={2}
                                                size={75}
                                                maxLength={55}
                                                fdprocessedid="06ycm8"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="Label">
                                        <div align="left">Designation</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                name="designation"
                                                type="text"
                                                className="TextField"
                                                id="designation"
                                                tabIndex={3}
                                                size={75}
                                                maxLength={75}
                                                fdprocessedid="ve7yl"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={31} className="Label">
                                        <div align="left">Date/Place</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                name="place"
                                                type="text"
                                                className="TextArea"
                                                id="place"
                                                size={75}
                                                maxLength={75}
                                                fdprocessedid="rkk9ja"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={78} valign="top" className="Label">
                                        <div align="left">Heading</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <textarea
                                                name="heading"
                                                cols={70}
                                                rows={5}
                                                className="TextArea"
                                                id="heading"
                                                tabIndex={4}
                                                defaultValue={""}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="Label">
                                        <div align="left">Sub-Heading</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                name="subheading"
                                                type="text"
                                                className="TextField"
                                                id="subheading"
                                                size={75}
                                                maxLength={150}
                                                fdprocessedid="nn1tra"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="Label">
                                        <div align="left">Image First</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                name="imagefirst"
                                                type="file"
                                                className="TextField"
                                                id="imagefirst"
                                                size={60}
                                                maxLength={60}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="Label">
                                        <div align="left">Image First Caption</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                name="caption2"
                                                type="text"
                                                className="TextField"
                                                id="caption2"
                                                size={75}
                                                maxLength={150}
                                                fdprocessedid="nygll"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="Label">
                                        <div align="left">Image Second</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                name="imagesecond"
                                                type="file"
                                                className="TextField"
                                                id="imagesecond"
                                                size={60}
                                                maxLength={60}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={31} className="Label">
                                        <div align="left">Image Second Caption</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                name="caption3"
                                                type="text"
                                                className="TextField"
                                                id="caption3"
                                                size={75}
                                                maxLength={150}
                                                fdprocessedid="oincq"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={33} className="Label">
                                        <div align="left">Image Third</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                name="imagethird"
                                                type="file"
                                                className="TextField"
                                                id="imagethird"
                                                size={60}
                                                maxLength={60}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={31} className="Label">
                                        <div align="left">Image Third Caption</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                name="caption4"
                                                type="text"
                                                className="TextField"
                                                id="caption4"
                                                size={75}
                                                maxLength={150}
                                                fdprocessedid="seg7qf"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={29} className="Label">
                                        &nbsp;
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left" className="Label">
                                            *Please press the Enter Key after every paragraph
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={78} valign="top" className="Label">
                                        <div align="left">Matter</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <textarea
                                                name="matter"
                                                cols={70}
                                                rows={5}
                                                className="TextArea"
                                                id="matter"
                                                style={{ display: "none" }}
                                                defaultValue={""}
                                            />
                                            <table
                                                cellPadding={0}
                                                cellSpacing={0}
                                                border={0}
                                                className="toolbar1"
                                                style={{ width: 502 }}
                                            >
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: 6 }}>
                                                            <img src="icons/seperator2.gif" alt="" hspace={3} />
                                                        </td>
                                                        <td style={{ width: 90 }}>
                                                            <span id="FontSelectmatter">
                                                                <table border={0} cellPadding={0} cellSpacing={0}>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                onmouseover="document.getElementById('selectFontmatter').src='icons/select_font_on.gif';"
                                                                                onmouseout="document.getElementById('selectFontmatter').src='icons/select_font.gif';"
                                                                            >
                                                                                <img
                                                                                    src="icons/select_font.gif"
                                                                                    id="selectFontmatter"
                                                                                    width={85}
                                                                                    height={20}
                                                                                    onclick="showFonts('matter');"
                                                                                    unselectable="on"
                                                                                />
                                                                                <br />
                                                                                <span
                                                                                    id="Fontsmatter"
                                                                                    className="dropdown"
                                                                                    style={{ width: 145, display: "none" }}
                                                                                >
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontName','matter','Arial'); hideFonts('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 120 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily: "Arial",
                                                                                                            fontSize: 12
                                                                                                        }}
                                                                                                    >
                                                                                                        Arial
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontName','matter','Comic Sans MS'); hideFonts('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 120 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily: "Comic Sans MS",
                                                                                                            fontSize: 12
                                                                                                        }}
                                                                                                    >
                                                                                                        Comic Sans MS
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontName','matter','Courier New'); hideFonts('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 120 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily: "Courier New",
                                                                                                            fontSize: 12
                                                                                                        }}
                                                                                                    >
                                                                                                        Courier New
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontName','matter','Georgia'); hideFonts('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 120 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily: "Georgia",
                                                                                                            fontSize: 12
                                                                                                        }}
                                                                                                    >
                                                                                                        Georgia
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontName','matter','Impact'); hideFonts('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 120 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily: "Impact",
                                                                                                            fontSize: 12
                                                                                                        }}
                                                                                                    >
                                                                                                        Impact
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontName','matter','Kruti Dev 040 Wide'); hideFonts('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 120 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily: "Kruti Dev 040 Wide",
                                                                                                            fontSize: 12
                                                                                                        }}
                                                                                                    >
                                                                                                        Kruti Dev 040 Wide
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontName','matter','Sans Serif'); hideFonts('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 120 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily: "Sans Serif",
                                                                                                            fontSize: 12
                                                                                                        }}
                                                                                                    >
                                                                                                        Sans Serif
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontName','matter','Tahoma'); hideFonts('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 120 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily: "Tahoma",
                                                                                                            fontSize: 12
                                                                                                        }}
                                                                                                    >
                                                                                                        Tahoma
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontName','matter','Times New Roman'); hideFonts('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 120 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily: "Times New Roman",
                                                                                                            fontSize: 12
                                                                                                        }}
                                                                                                    >
                                                                                                        Times New Roman
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontName','matter','Verdana'); hideFonts('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 120 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily: "Verdana",
                                                                                                            fontSize: 12
                                                                                                        }}
                                                                                                    >
                                                                                                        Verdana
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </span>
                                                        </td>
                                                        <td style={{ width: 60 }}>
                                                            <span id="FontSizesmatter">
                                                                <table border={0} cellPadding={0} cellSpacing={0}>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                onmouseover="document.getElementById('selectSizematter').src='icons/select_size_on.gif';"
                                                                                onmouseout="document.getElementById('selectSizematter').src='icons/select_size.gif';"
                                                                            >
                                                                                <img
                                                                                    src="icons/select_size.gif"
                                                                                    id="selectSizematter"
                                                                                    width={49}
                                                                                    height={20}
                                                                                    onclick="showFontSizes('matter');"
                                                                                    unselectable="on"
                                                                                />
                                                                                <br />
                                                                                <span
                                                                                    id="Sizesmatter"
                                                                                    className="dropdown"
                                                                                    style={{ width: 170, display: "none" }}
                                                                                >
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontSize','matter','1');hideFontSizes('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 145 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily:
                                                                                                                "arial, verdana, helvetica"
                                                                                                        }}
                                                                                                    >
                                                                                                        <font size={1}>size 1</font>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontSize','matter','2');hideFontSizes('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 145 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily:
                                                                                                                "arial, verdana, helvetica"
                                                                                                        }}
                                                                                                    >
                                                                                                        <font size={2}>size 2</font>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontSize','matter','3');hideFontSizes('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 145 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily:
                                                                                                                "arial, verdana, helvetica"
                                                                                                        }}
                                                                                                    >
                                                                                                        <font size={3}>size 3</font>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontSize','matter','4');hideFontSizes('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 145 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily:
                                                                                                                "arial, verdana, helvetica"
                                                                                                        }}
                                                                                                    >
                                                                                                        <font size={4}>size 4</font>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontSize','matter','5');hideFontSizes('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 145 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily:
                                                                                                                "arial, verdana, helvetica"
                                                                                                        }}
                                                                                                    >
                                                                                                        <font size={5}>size 5</font>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontSize','matter','6');hideFontSizes('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 145 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily:
                                                                                                                "arial, verdana, helvetica"
                                                                                                        }}
                                                                                                    >
                                                                                                        <font size={6}>size 6</font>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                    <button
                                                                                        type="button"
                                                                                        onclick="formatText('FontSize','matter','7');hideFontSizes('matter');"
                                                                                        onmouseover="this.className='mouseOver'"
                                                                                        onmouseout="this.className='mouseOut'"
                                                                                        className="mouseOut"
                                                                                        style={{ width: 145 }}
                                                                                    >
                                                                                        <table
                                                                                            cellPadding={0}
                                                                                            cellSpacing={0}
                                                                                            border={0}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        align="left"
                                                                                                        style={{
                                                                                                            fontFamily:
                                                                                                                "arial, verdana, helvetica"
                                                                                                        }}
                                                                                                    >
                                                                                                        <font size={7}>size 7</font>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </button>
                                                                                    <br />
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </span>
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/bold.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Bold"
                                                                id="Bold"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/bold_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/bold.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/italics.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Italic"
                                                                id="Italic"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/italics_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/italics.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/underline.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Underline"
                                                                id="Underline"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/underline_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/underline.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 12 }} align="center">
                                                            <img
                                                                src="icons/seperator.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                width={2}
                                                                height={18}
                                                                hspace={2}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/subscript.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Subscript"
                                                                id="Subscript"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/subscript_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/subscript.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/superscript.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Superscript"
                                                                id="Superscript"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/superscript_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/superscript.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 12 }} align="center">
                                                            <img
                                                                src="icons/seperator.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                width={2}
                                                                height={18}
                                                                hspace={2}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/justify_left.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Justifyleft"
                                                                id="Justifyleft"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/justify_left_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/justify_left.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/justify_center.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Justifycenter"
                                                                id="Justifycenter"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/justify_center_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/justify_center.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/justify_right.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Justifyright"
                                                                id="Justifyright"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/justify_right_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/justify_right.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 12 }} align="center">
                                                            <img
                                                                src="icons/seperator.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                width={2}
                                                                height={18}
                                                                hspace={2}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/list_unordered.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="InsertUnorderedList"
                                                                id="InsertUnorderedList"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/list_unordered_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/list_unordered.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/list_ordered.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="InsertOrderedList"
                                                                id="InsertOrderedList"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/list_ordered_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/list_ordered.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/indent_left.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Outdent"
                                                                id="Outdent"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/indent_left_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/indent_left.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/indent_right.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Indent"
                                                                id="Indent"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/indent_right_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/indent_right.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td>&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table
                                                cellPadding={0}
                                                cellSpacing={0}
                                                border={0}
                                                className="toolbar2"
                                                style={{ width: 502 }}
                                            >
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: 6 }}>
                                                            <img src="icons/seperator2.gif" alt="" hspace={3} />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/forecolor.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="ForeColor"
                                                                id="ForeColor"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/forecolor_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/forecolor.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/backcolor.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="BackColor"
                                                                id="BackColor"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/backcolor_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/backcolor.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 12 }} align="center">
                                                            <img
                                                                src="icons/seperator.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                width={2}
                                                                height={18}
                                                                hspace={2}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/cut.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Cut"
                                                                id="Cut"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/cut_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/cut.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/copy.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Copy"
                                                                id="Copy"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/copy_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/copy.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/paste.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Paste"
                                                                id="Paste"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/paste_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/paste.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 12 }} align="center">
                                                            <img
                                                                src="icons/seperator.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                width={2}
                                                                height={18}
                                                                hspace={2}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/undo.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Undo"
                                                                id="Undo"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/undo_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/undo.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/redo.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Redo"
                                                                id="Redo"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/redo_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/redo.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 12 }} align="center">
                                                            <img
                                                                src="icons/seperator.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                width={2}
                                                                height={18}
                                                                hspace={2}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/insert_table.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="InsertTable"
                                                                id="InsertTable"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/insert_table_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/insert_table.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/insert_picture.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="InsertImage"
                                                                id="InsertImage"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/insert_picture_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/insert_picture.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/insert_hyperlink.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="CreateLink"
                                                                id="CreateLink"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/insert_hyperlink_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/insert_hyperlink.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td style={{ width: 12 }} align="center">
                                                            <img
                                                                src="icons/seperator.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                width={2}
                                                                height={18}
                                                                hspace={2}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <span id="HTMLModematter">
                                                                <img
                                                                    src="icons/view_source.gif"
                                                                    border={0}
                                                                    unselectable="on"
                                                                    title="ViewSource"
                                                                    id="ViewSource"
                                                                    className="button"
                                                                    onclick="formatText(this.id,'matter');"
                                                                    onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/view_source_on.gif';"
                                                                    onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/view_source.gif';"
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                            </span>
                                                            <span id="textModematter" style={{ display: "none" }}>
                                                                <img
                                                                    src="icons/view_text.gif"
                                                                    border={0}
                                                                    unselectable="on"
                                                                    title="viewText"
                                                                    id="ViewText"
                                                                    className="button"
                                                                    onclick="formatText(this.id,'matter');"
                                                                    onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/view_text_on.gif';"
                                                                    onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/view_text.gif';"
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                            </span>
                                                        </td>
                                                        <td style={{ width: 12 }} align="center">
                                                            <img
                                                                src="icons/seperator.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                width={2}
                                                                height={18}
                                                                hspace={2}
                                                            />
                                                        </td>
                                                        <td style={{ width: 22 }}>
                                                            <img
                                                                src="icons/help.gif"
                                                                border={0}
                                                                unselectable="on"
                                                                title="Help"
                                                                id="Help"
                                                                className="button"
                                                                onclick="formatText(this.id,'matter');"
                                                                onmouseover="if(className=='button'){className='buttonOver'}; this.src='icons/help_on.gif';"
                                                                onmouseout="if(className=='buttonOver'){className='button'}; this.src='icons/help.gif';"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </td>
                                                        <td>&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table
                                                cellPadding={0}
                                                cellSpacing={0}
                                                border={0}
                                                style={{ width: 500, height: 150, border: "1px inset #CCCCCC" }}
                                            >
                                                <tbody>
                                                    <tr>
                                                        <td valign="top">
                                                            <iframe
                                                                frameBorder={0}
                                                                id="wysiwygmatter"
                                                                style={{ height: 150, width: 500 }}
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={33} colSpan={3}>
                                        <div align="center">
                                            <input
                                                name="Save"
                                                type="submit"
                                                className="Button"
                                                id="Save"
                                                defaultValue="Submit"
                                                fdprocessedid="xd5i1"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>



                    {/* <Form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">

                        <Form.Group className="mb-3">
                            <Form.Label>Reporter's Image</Form.Label>
                            <Form.Control type="text" placeholder="heading" value={inputs.heading || ""} onChange={handleChange} name='heading' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Reporter's Name</Form.Label>
                            <Form.Control type="text" placeholder="SubHeading" value={inputs.subheading || ""} onChange={handleChange} name='subheading' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control type="text" placeholder="Short desc" value={inputs.shortdesc || ""} onChange={handleChange} name='shortdesc' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Banner Image</Form.Label>
                            <Form.Control type="file" placeholder="Short desc" onChange={imagehandler} name="file" />
                        </Form.Group>

                        <Button type="submit" onClick={FormSubmit}>Submit</Button>
                    </Form> */}
                </Col>
            </Row>
        </Container>
    )
}

export default AddRajyonKhabarain
