import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import '../../Css/font-awesome.min.css';
import '../../Css/materialdesignicons.min.css';
import '../../Css/style.css';
import logos from '../../images/logos.png';
import Footer from '../Common/footer';
import Left from '../Common/Left';
import Logout from '../Common/Logout';
import useWindowDimensions from '../Common/useWindowDimensions';

function Index() {

    var SliderSettings = {
        dots: false,
        infinite: true,
        speed: 1500,
        autoplay: true,
        autoplaySpeed: 6000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },

        ],
    };


    const [DashboardNo, setDashboardNo] = useState([]);
    const [DashboardData, setDashboardData] = useState([]);
    const [ReviewNo, setReviewNo] = useState([]);

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
    const [Menupos, setMenupos] = useState(false);
    const { height, width } = useWindowDimensions();

    const [Menupos1, setMenupos1] = useState(false);
    const ShowMenu1 = () => {
        if (Menupos1) {
            setMenupos1(false)
        } else {
            setMenupos1(true)
        }

    }

    let history = useHistory();
    const checkboxCellRenderer = () => {
        return '';
    }
    const statusCellRenderer = (params) => {
        //console.log(params)
        return `<div class=${params.value}>${params.value}</div>`;
    }
    const setNumberFilterParams = {
        buttons: ["clear"],
        allowedCharPattern: "\\d\\-\\,\\$",
        numberParser: function (text) {
            //console.log(text)
            return text == null ? null : parseInt(text)
        }
    }
    const setTextFilterParams = {
        buttons: ["clear"],
        suppressAndOrCondition: true,
        fiterOptions: ["contains", "notContains"]
    }

    function dateFormatter(params) {
        if (params.value.trim() === '') {
            return;
        } else {
            const dateval = new Date((params.value).toString().split('T')[0])
            return moment(dateval).format("MM/DD/YYYY");
        }
        //console.log((params.data['Application Date']).toString().split('T')[0])

    }

    const setDateFilterParams = {
        buttons: ["clear"],
        comparator: function (filtervalue, cellvalue) {

            const dateval1 = moment(new Date(filtervalue)).format("MM/DD/YYYY")
            const dateval2 = moment(new Date(cellvalue.toString().split('T')[0])).format("MM/DD/YYYY")
            if (dateval1 === dateval2) {
                return 0;
            }
            //console.log(dateval1)
            //console.log(dateval2)
        }
    }

    const gridOptions = {
        defaultColDef: {
            resizable: true
        },
        sizeColumnsToFit: true,
        checkboxSelection: true,
        columnDefs: [
            // {
            //     headerName: "",
            //     field: "id",
            //     rowDrag: false,
            //     headerCheckboxSelection: true,
            //     headerCheckboxSelectionFilteredOnly: true,
            //     checkboxSelection: true,
            //     lockPosition: true,
            //     cellRenderer: checkboxCellRenderer
            // },

            {
                headerName: "Name",
                field: "name",
                sortable: true,
                filter: "agTextColumnFilter",
                filterParams: setTextFilterParams,
                pinned: width <= 1024 ? '' : 'left',
            },
            {
                headerName: "PhD Institution",
                field: "PhD Institution",
                rowDrag: false,
                sortable: true,
                filter: 'agTextColumnFilter',
                hide: true,
                filterParams: setTextFilterParams,
            },
            {
                headerName: "PhD Year",
                field: "PhD Year",
                rowDrag: false,
                sortable: true,
                filter: "agTextColumnFilter",
                hide: true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Application Date",
                field: "Application Date",
                rowDrag: false,
                sortable: true,
                filter: "agDateColumnFilter",
                hide: true,
                filterParams: setDateFilterParams,
                valueFormatter: dateFormatter
            },
            {
                headerName: "Current Position",
                field: "Current Position",
                rowDrag: false,
                sortable: true,
                filter: true,
                filter: 'agTextColumnFilter',
                hide: true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Status",
                field: "Status",
                rowDrag: false,
                sortable: true,
                hide: true,
                filter: true,
                cellRenderer: statusCellRenderer
            },
            {
                headerName: "Assignee",
                field: "Assignee",
                rowDrag: false,
                sortable: true,
                filter: 'agTextColumnFilter',
                hide: true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Due Date",
                field: "Due Date",
                rowDrag: false,
                sortable: true,
                filter: "agDateColumnFilter",
                hide: true,
                filterParams: setDateFilterParams,
                valueFormatter: dateFormatter
            },






        ],
        //suppressHorizontalScroll:true,
        rowSelection: 'multiple',
        domLayout: "autoHeight",
        onRowClicked: (event) => history.push(`/Userdetails/${event.data.id}`)
    }





    const gridOptionsMobile = {
        defaultColDef: {
            resizable: true
        },
        sizeColumnsToFit: true,
        checkboxSelection: true,
        columnDefs: [
            // {
            //     headerName: "",
            //     field: "id",
            //     rowDrag: false,
            //     headerCheckboxSelection: true,
            //     headerCheckboxSelectionFilteredOnly: true,
            //     checkboxSelection: true,
            //     lockPosition: true,
            //     cellRenderer: checkboxCellRenderer
            // },

            {
                headerName: "Name",
                field: "name",
                sortable: true,
                filter: "agTextColumnFilter",
                filterParams: setTextFilterParams,
                //pinned:width <= 1024 ?'':'left',
            },
            {
                headerName: "PhD Institution",
                field: "PhD Institution",
                rowDrag: false,
                sortable: true,
                filter: 'agTextColumnFilter',
                hide: true,
                filterParams: setTextFilterParams,
            },
            {
                headerName: "PhD Year",
                field: "PhD Year",
                rowDrag: false,
                sortable: true,
                filter: "agTextColumnFilter",
                hide: true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Application Date",
                field: "Application Date",
                rowDrag: false,
                sortable: true,
                filter: "agDateColumnFilter",
                hide: true,
                filterParams: setDateFilterParams,
                valueFormatter: dateFormatter
            },
            {
                headerName: "Current Position",
                field: "Current Position",
                rowDrag: false,
                sortable: true,
                filter: true,
                filter: 'agTextColumnFilter',
                hide: true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Status",
                field: "Status",
                rowDrag: false,
                sortable: true,
                hide: true,
                filter: true,
                cellRenderer: statusCellRenderer
            },
            {
                headerName: "Assignee",
                field: "Assignee",
                rowDrag: false,
                sortable: true,
                filter: 'agTextColumnFilter',
                hide: true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Due Date",
                field: "Due Date",
                rowDrag: false,
                sortable: true,
                filter: "agDateColumnFilter",
                hide: true,
                filterParams: setDateFilterParams,
                valueFormatter: dateFormatter
            },






        ],
        //suppressHorizontalScroll:true,
        rowSelection: 'multiple',
        domLayout: "autoHeight",
        onRowClicked: (event) => history.push(`/Userdetails/${event.data.id}`)
    }









    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        //getListingData();
        getDashboardData(params.columnApi)
    }

    const getRowNodeId = (data) => {
        return data.id;
    }

    var reviewNo = 0;
    useEffect(() => {

        getDashboardNo();
        //getDashboardData();
        getReviewNo();
    }, [])

    // const getDashboardData=()=>{
    //     const data ={}
    //     const options ={
    //         headers:{
    //             "cache-control":"no-cache",
    //             "Content-Type":"application/json;charset=utf-8",
    //             "Access-Control-Allow-Origin":"",
    //             "Authorization":`Bearer ${localStorage.getItem("Token")}`
    //         }
    //     }
    //     Axios.post(
    //         process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_DASHBOARD_URL,data,{
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem("Token")}`,
    //                 "Content-Type":"application/json",
    //                 "Access-Control-Allow-Origin":"*",
    //               }
    //         }
    //     )

    //     .then(res => {

    //         setDashboardData(res.data);
    //         var students = [];
    //             var result = res.data.map(({ fieldDetails }) => fieldDetails);
    //             console.log(result)
    //             result.map((item,index)=>{
    //                 students.push({
    //                     "id": res.data[index].gid,
    //                     "name": item[0].value,
    //                     "age": parseInt(item[1].value),
    //                     "currentposition": item[2].value,
    //                     "Citizenship": item[3].value,
    //                     "PhDInstitutionYear": item[4].value,
    //                     "gender": item[5].value,
    //                     "PhdSubject": item[6].value,
    //                     "status": item[7].value
    //                 });
    //             })

    //             console.log(students)
    //             setRowData(students);

    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })
    // }


    const getDashboardData = (params) => {
        const data = {}
        const options = {
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "",
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            }
        }
        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_DASHBOARD_URL, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
        )

            .then(res => {

                setDashboardData(res.data);
                var students = [];
                var result = res.data.map(({ fieldDetails }) => fieldDetails);
                //console.log(result)
                result[0].map((item, index) => {
                    //console.log(item.name)
                    params.setColumnVisible(item.name, true)
                })
                result.map((item, index) => {
                    // students.push({
                    //     "id": res.data[index].gid,
                    //     "name": item[0].value,
                    //     "age": parseInt(item[1].value),
                    //     "currentposition": item[2].value,
                    //     "Citizenship": item[3].value,
                    //     "PhDInstitutionYear": item[4].value,
                    //     "gender": item[5].value,
                    //     "PhdSubject": item[6].value,
                    //     "status": item[7].value
                    // });
                    let temp = []
                    let sn = {}
                    sn["id"] = res.data[index].gid
                    item.map((it, iy) => {
                        sn[it.name] = it.value
                        temp.push({
                            [it.name]: it.value
                        })
                    })
                    temp.push({ "id": res.data[index].gid })

                    students.push(sn)
                })

                //console.log(students)
                setRowData(students);

            })
            .catch(err => {
                console.log(err);
            })
    }

    const getReviewNo = () => {
        const data = {}
        const options = {
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "",
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            }
        }
        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_REVIEWNO_URL, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
        )

            .then(res => {
                //console.log(res.data)
                setReviewNo(res.data.reviewNo)

            })
            .catch(err => {
                console.log(err);
            })
    }

    const getDashboardNo = () => {
        const data = {}
        const options = {
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "",
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            }
        }
        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_DASHBOARD_NO_URL, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
        )

            .then(res => {

                setDashboardNo(res.data);
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const ShowMenu = () => {
        if (Menupos) {
            setMenupos(false)
        } else {
            setMenupos(true)
        }

    }

    return (
        <div className="top-part-new1">
            <Left isShow={(Menupos1) ? "sidebar-icon-only" : ""} />
            <div className="tty container-fluid page-body-wrapper">
                <div id="theme-settings" className="settings-panel">
                    <i className="settings-close mdi mdi-close"></i>
                    <p className="settings-heading">SIDEBAR SKINS</p>
                    <div className="sidebar-bg-options selected" id="sidebar-default-theme">
                        <div className="img-ss rounded-circle bg-light border mr-3"></div> Default
                    </div>
                    <div className="sidebar-bg-options" id="sidebar-dark-theme">
                        <div className="img-ss rounded-circle bg-dark border mr-3"></div> Dark
                    </div>
                    <p className="settings-heading mt-2">HEADER SKINS</p>
                    <div className="color-tiles mx-0 px-4">
                        <div className="tiles light"></div>
                        <div className="tiles dark"></div>
                    </div>
                </div>
                <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
                    <div className="navbar-menu-wrapper d-flex align-items-stretch justify-content-between">
                        <a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="index.html"><img src={logos} alt="" /></a>
                        <button className="navbar-toggler navbar-toggler align-self-center mr-2" type="button" onClick={() => ShowMenu1()}>
                            <i className="mdi mdi-menu"></i>
                        </button>
                        <ul className="navbar-nav">

                            <li className="nav-item nav-search border-0 ml-1 ml-md-3 ml-lg-5 d-none d-md-flex">

                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search" />
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <i className="mdi mdi-magnify"></i>
                                        </span>
                                    </div>
                                </div>

                            </li>
                        </ul>
                        <ul className="navbar-nav navbar-nav-right ml-lg-auto">
                            <li className="nav-item dropdown">
                                <Link to={"#"} className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" data-toggle="dropdown">
                                    <i className="mdi mdi-bell-outline"></i>
                                </Link>
                                <div className="dropdown-menu navbar-dropdown navbar-dropdown-large preview-list"
                                    aria-labelledby="notificationDropdown">
                                    <h6 className="p-3 mb-0">Notifications</h6>
                                    {/* <Link to={"#"} className="dropdown-item preview-item">
                                        <div className="preview-thumbnail">

                                        </div>
                                        <div className="preview-item-content">
                                            <p className="mb-0"> Dany Miles <span className="text-small text-muted">commented on your photo</span>
                                            </p>
                                        </div>
                                    </Link>
                                    <Link to={"#"} className="dropdown-item preview-item">
                                        <div className="preview-thumbnail">

                                        </div>
                                        <div className="preview-item-content">
                                            <p className="mb-0"> James <span className="text-small text-muted">posted a photo on your wall</span>
                                            </p>
                                        </div>
                                    </Link>
                                    <Link to={"#"} className="dropdown-item preview-item">
                                        <div className="preview-thumbnail">
                                            <img src="images/faces/face2.jpg" alt="" className="profile-pic" />
                                        </div>
                                        <div className="preview-item-content">
                                            <p className="mb-0"> Alex <span className="text-small text-muted">just mentioned you in his post</span>
                                            </p>
                                        </div>
                                    </Link> */}
                                    <div className="dropdown-divider"></div>
                                    <p className="p-3 mb-0">View all activities</p>
                                </div>
                            </li>
                            <li className="nav-item dropdown d-none d-sm-flex">
                                <Link to={"#"} className="nav-link count-indicator dropdown-toggle" id="messageDropdown" data-toggle="dropdown">
                                    <i className="mdi mdi-email-outline"></i>
                                </Link>
                                <div className="dropdown-menu navbar-dropdown navbar-dropdown-large preview-list"
                                    aria-labelledby="messageDropdown">
                                    <h6 className="p-3 mb-0">Messages</h6>
                                    <Link to={"#"} className="dropdown-item preview-item">
                                        <div className="preview-item-content flex-grow">
                                            <span className="badge badge-pill badge-success">Request</span>
                                            <p className="text-small text-muted ellipsis mb-0"> Suport needed for user123 </p>
                                        </div>
                                        <p className="text-small text-muted align-self-start"> 4:10 PM </p>
                                    </Link>
                                    <Link to={"#"} className="dropdown-item preview-item">
                                        <div className="preview-item-content flex-grow">
                                            <span className="badge badge-pill badge-warning">Invoices</span>
                                            <p className="text-small text-muted ellipsis mb-0"> Invoice for order is mailed </p>
                                        </div>
                                        <p className="text-small text-muted align-self-start"> 4:10 PM </p>
                                    </Link>
                                    <Link to={"#"} className="dropdown-item preview-item">
                                        <div className="preview-item-content flex-grow">
                                            <span className="badge badge-pill badge-danger">Projects</span>
                                            <p className="text-small text-muted ellipsis mb-0"> New project will start tomorrow </p>
                                        </div>
                                        <p className="text-small text-muted align-self-start"> 4:10 PM </p>
                                    </Link>
                                    <h6 className="p-3 mb-0">See all activity</h6>
                                </div>
                            </li>

                            <li className="nav-item nav-profile dropdown border-0">
                                <Link onClick={() => ShowMenu()} to={"#"} className="nav-link dropdown-toggle" id="profileDropdown" data-toggle="dropdown">

                                    {
                                        localStorage.getItem("photoURL") != undefined && localStorage.getItem("photoURL").length > 0 ?
                                            <>
                                                {
                                                    <img className="nav-profile-img mr-2" alt="" src={localStorage.getItem("photoURL")} />
                                                }
                                            </>
                                            :
                                            <>
                                                <div className='user-name'>{localStorage.getItem("UserShortName")}</div>
                                            </>
                                    }


                                    <span className="profile-name">{localStorage.getItem("UserFullName")}</span>
                                </Link>
                                {Menupos === true && <div className="navbar-dropdown w-100" aria-labelledby="profileDropdown">

                                    <Logout />
                                </div>}
                            </li>
                        </ul>
                        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                            data-toggle="offcanvas">
                            <span className="mdi mdi-menu"></span>
                        </button>
                    </div>
                </nav>
                <div className='bg-danger' >sdas
                </div>
                <div className="main-panel">

                    <div className="content-wrapper pb-0">

                        {/* <div className="page-header flex-wrap">
                            <h3 className="mb-0">Dashboard </h3>
                        </div> */}

                        <div className="top-box">
                            <h3>Hello {localStorage.getItem("UserFullName")}</h3>
                            <p>You have {ReviewNo} pending applications for review.</p>
                        </div> 
                        <div className='home-section bg-danger' >
                            {/* <div className='d-flex' >
                                <div className='col-8 bg-primary home-section-left' >
                                    <div className='home-section-one' >

                                    </div>
                                </div>
                                <div className='col-4 bg-danger home-section-right' >

                                </div>
                            </div> */}
                        </div>


                        <div className="">

                            <div className="col-xl-12 col-lg-12 stretch-card grid-margin">
                                <Slider {...SliderSettings}>
                                    <div className="stretch-card grid-margin grid-margin-sm-0">
                                        <div className="no-line card bg-warning">
                                            <div className="box1 card-body px-3 py-4">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div className="color-card">

                                                        <h2 className="text-white"> {DashboardNo.totalNo}</h2>
                                                        <p className="mb-0 color-card-head">Applicants</p>
                                                    </div>

                                                </div>
                                                <h6 className="text-white">Submitted</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="stretch-card grid-margin grid-margin-sm-0">
                                        <div className="no-line card bg-warning">
                                            <div className="box2 card-body px-3 py-4">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div className="color-card">

                                                        <h2 className="text-white"> {DashboardNo.needToReview}</h2>
                                                        <p className="mb-0 color-card-head">Applicants</p>
                                                    </div>
                                                </div>
                                                <h6 className="text-white">need to review</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="stretch-card grid-margin grid-margin-sm-0">
                                        <div className="no-line card bg-warning">
                                            <div className="box3 card-body px-3 py-4">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div className="color-card">

                                                        <h2 className="text-white"> {DashboardNo.shortlisted}</h2>
                                                        <p className="mb-0 color-card-head">Applicants</p>
                                                    </div>
                                                </div>
                                                <h6 className="text-white">short listed</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="stretch-card grid-margin grid-margin-sm-0">
                                        <div className="no-line card bg-warning">
                                            <div className="box1 card-body px-3 py-4">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div className="color-card">

                                                        <h2 className="text-white"> {DashboardNo.totalNo}</h2>
                                                        <p className="mb-0 color-card-head">Applicants</p>
                                                    </div>
                                                </div>
                                                <h6 className="text-white">Submitted</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="stretch-card grid-margin grid-margin-sm-0">
                                        <div className="no-line card bg-warning">
                                            <div className="box2 card-body px-3 py-4">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div className="color-card">

                                                        <h2 className="text-white"> {DashboardNo.needToReview}</h2>
                                                        <p className="mb-0 color-card-head">Applicants</p>
                                                    </div>
                                                </div>
                                                <h6 className="text-white">need to review</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="stretch-card grid-margin grid-margin-sm-0">
                                        <div className="no-line card bg-warning">
                                            <div className="box3 card-body px-3 py-4">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div className="color-card">

                                                        <h2 className="text-white"> {DashboardNo.shortlisted}</h2>
                                                        <p className="mb-0 color-card-head">Applicants</p>
                                                    </div>
                                                </div>
                                                <h6 className="text-white">short listed</h6>
                                            </div>
                                        </div>
                                    </div>
                                </Slider>
                            </div>








                            <div className="bbr col-xl-12 col-sm-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body px-0 overflow-auto">
                                        <div className="table-responsive">


                                            {/* <div className="ag-theme-alpine" id='mn' style={{height:height-210, width:width}}> */}
                                            <div className="ag-theme-alpine" id='mn' style={{ height: height - 210 }}>
                                                {width > 1024 && <AgGridReact
                                                    gridOptions={gridOptions}
                                                    immutableData={true}
                                                    getRowNodeId={getRowNodeId}
                                                    rowData={rowData}
                                                    onGridReady={onGridReady}></AgGridReact>}

                                                {width <= 1024 && <AgGridReact
                                                    gridOptions={gridOptionsMobile}
                                                    immutableData={true}
                                                    getRowNodeId={getRowNodeId}
                                                    rowData={rowData}
                                                    onGridReady={onGridReady}></AgGridReact>}
                                            </div>









                                            {/* {DashboardData && DashboardData.length>0 && <table className="table">
                                            <thead className="bg-light">
                                                
                                                <tr>
                                                    {
                                                         DashboardData[0].fieldDetails.map((item)=><th key={item.name}>{item.name}</th>)
                                                    }
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    DashboardData.map((item)=><tr key={item.id}>{
                                                        item.fieldDetails.map((item1)=><td>{
                                                            item1.value
                                                            }</td>)
                                                    }</tr>)
                                                }
                                                
                                                
                                                
                                                
                                               
                                               

                                            </tbody>
                                        </table>} */}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>






                    </div>

                </div>

            </div>
            <Footer />
        </div>
    );
}

export default Index;