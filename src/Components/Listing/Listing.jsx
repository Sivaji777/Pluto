import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from "@material-ui/pickers";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import Axios from 'axios';
import 'date-fns';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import back from '../../images/back.png';
import close from '../../images/close.png';
import logos from '../../images/logos.png';
import Footer from '../Common/footer';
import Left from '../Common/Left';
import Logout from '../Common/Logout';
import useWindowDimensions from '../Common/useWindowDimensions';




function Listing() {
    const [ListingData, setListingData] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
    const [Assign, setAssign] = useState('');
    const { id } = useParams();
    let history = useHistory();
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [assignList, setassignList] = useState([]);

    const [AssignDateMsg, setAssignDateMsg] = useState('');
    const [AssignMsg, setAssignMsg] = useState('');
    const [AssignListMsg, setAssignListMsg] = useState('');
    const [projectname, setprojectname] = useState('')

    const [open, setOpen] = React.useState(false);
    const [msg, setmsg] = useState('');
    const [severity, setseverity] = useState('success');
    const [Menupos, setMenupos] = useState(false);

    const [ButtonList, setButtonList] = useState([]);
    const [IsAssignAllowed, setIsAssignAllowed] = useState(false);
    const [UpdateListMsg, setUpdateListMsg] = useState('')

    const [CommentOpen,setCommentOpen] = useState(false)
    const [ButtonStatus,setButtonStatus] = useState('')
    const [Comments,setComments] = useState('')
    const [CommentMsg,setCommentMsg] = useState('')
    const { height, width } = useWindowDimensions();
    
    const [PopUpButtonClickStatus,setPopUpButtonClickStatus] = useState(false)

    const [Menupos1, setMenupos1] = useState(false);
    const ShowMenu1 = () => {
        if (Menupos1) {
            setMenupos1(false)
        } else {
            setMenupos1(true)
        }

    }

    const handleDateChange = (date) => {
       // console.log(date)
        setSelectedDate(date);
    };



    useEffect(() => {
        getListingData(null)
        getInitial()
        getProjectName()
        getProjectRole()
    }, [id])
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

    const gridOptions = {
        defaultColDef: {
            resizable: true
        },
        sizeColumnsToFit: true,
        checkboxSelection: true,
        columnDefs: [
            {
                headerName: "",
                field: "id",
                rowDrag: false,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                lockPosition: true,
                pinned:width <= 1024 ?'':'left',
                //pinned:'left',
                cellRenderer: checkboxCellRenderer,
                width:15, 
            },
            {
                headerName: "Name",
                field: "name",
                sortable: true,
                filter: "agTextColumnFilter",
                hide: true,
                filterParams: setTextFilterParams,
                pinned:width <= 1024 ?'':'left',
            },
            {
                headerName: "PhD Institution",
                field: "PhD Institution",
                rowDrag: false,
                sortable: true,
                filter: 'agTextColumnFilter',
                hide:true,
                filterParams: setTextFilterParams,
            },
            {
                headerName: "PhD Year",
                field: "PhD Year",
                rowDrag: false,
                sortable: true,
                filter: "agTextColumnFilter",
                hide:true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Application Date",
                field: "Application Date",
                rowDrag: false,
                sortable: true,
                filter: "agDateColumnFilter",
                hide:true,
                filterParams: setDateFilterParams,
                valueFormatter:dateFormatter
            },
            
            {
                headerName: "Current Position",
                field: "Current Position",
                rowDrag: false,
                sortable: true,
                filter: true,
                filter: 'agTextColumnFilter',
                hide:true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Status",
                field: "Status",
                rowDrag: false,
                sortable: true,
                hide:true,
                filter: true,
                cellRenderer:statusCellRenderer
            },
            {
                headerName: "Area of Expertise",
                field: "Area of Expertise",
                rowDrag: false,
                sortable: true,
                filter: 'agTextColumnFilter',
                hide:true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Citizenship",
                field: "Citizenship",
                rowDrag: false,
                sortable: true,
                filter: true,
                hide:true,
                filter: 'agTextColumnFilter',
                filterParams: setTextFilterParams,
            },
            {
                headerName: "Region of Citizenship",
                field: "Region of Citizenship",
                rowDrag: false,
                sortable: true,
                filter: 'agTextColumnFilter',
                hide:true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Assignee",
                field: "Assignee",
                rowDrag: false,
                sortable: true,
                filter: 'agTextColumnFilter',
                hide:true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Due Date",
                field: "Due Date",
                rowDrag: false,
                sortable: true,
                filter: "agDateColumnFilter",
                hide:true,
                filterParams: setDateFilterParams,
                valueFormatter:dateFormatter
            },
            {
                headerName: "Gender",
                field: "Gender",
                rowDrag: false,
                sortable: true,
                hide:true,
                filter: true
            },
            {
                headerName: "Phd Subject",
                field: "Phd Subject",
                rowDrag: false,
                sortable: true,
                hide:true,
                filter: true,
                filter: 'agTextColumnFilter',
                filterParams: setTextFilterParams,
            },












          
            // {
            //     headerName: "Current Position",
            //     field: "Current Position",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: true,
            //     filter: 'agTextColumnFilter',
            //     hide: true,
            //     filterParams: setTextFilterParams
            // },
            // {
            //     headerName: "Citizenship",
            //     field: "Citizenship",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: true,
            //     hide: true,
            //     filter: 'agTextColumnFilter',
            //     filterParams: setTextFilterParams,
            // },
            // {
            //     headerName: "PhD Year",
            //     field: "PhD Year",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: "agTextColumnFilter",
            //     hide: true,
            //     filterParams: setTextFilterParams
            // },
            // {
            //     headerName: "Gender",
            //     field: "Gender",
            //     rowDrag: false,
            //     sortable: true,
            //     hide: true,
            //     filter: true
            // },
            // {
            //     headerName: "Phd Subject",
            //     field: "Phd Subject",
            //     rowDrag: false,
            //     sortable: true,
            //     hide: true,
            //     filter: true,
            //     filter: 'agTextColumnFilter',
            //     filterParams: setTextFilterParams,
            // },
            // {
            //     headerName: "Status",
            //     field: "Status",
            //     rowDrag: false,
            //     sortable: true,
            //     hide: true,
            //     filter: true,
            //     cellRenderer:statusCellRenderer
            // },
            // {
            //     headerName: "PhD Institution",
            //     field: "PhD Institution",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: 'agTextColumnFilter',
            //     hide: true,
            //     filterParams: setTextFilterParams,
            // },
            // {
            //     headerName: "Application Date",
            //     field: "Application Date",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: "agDateColumnFilter",
            //     hide: true,
            //     filterParams: setDateFilterParams,
            //     valueFormatter: dateFormatter
            // },
            // {
            //     headerName: "Area of Expertise",
            //     field: "Area of Expertise",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: 'agTextColumnFilter',
            //     hide: true,
            //     filterParams: setTextFilterParams
            // },
            // {
            //     headerName: "Region of Citizenship",
            //     field: "Region of Citizenship",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: 'agTextColumnFilter',
            //     hide: true,
            //     filterParams: setTextFilterParams
            // },
            // {
            //     headerName: "Assignee",
            //     field: "Assignee",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: 'agTextColumnFilter',
            //     hide: true,
            //     filterParams: setTextFilterParams
            // },
            // {
            //     headerName: "Due Date",
            //     field: "Due Date",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: "agDateColumnFilter",
            //     hide: true,
            //     filterParams: setDateFilterParams,
            //     valueFormatter: dateFormatter
            // }
        ],
        //suppressHorizontalScroll:true,
        rowSelection: 'multiple',
        domLayout: "autoHeight",
        api:gridApi,
        onRowClicked: (event) => history.push(`/Userdetails/${event.data.id}`),
        //onSelectionChanged: (event)=>{console.log(event)},
        //onRowSelected: (event)=>{console.log(event)}

    }

    const gridOptionsMobile = {
        defaultColDef: {
            resizable: true
        },
        sizeColumnsToFit: true,
        checkboxSelection: true,
        columnDefs: [
            {
                headerName: "",
                field: "id",
                rowDrag: false,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                lockPosition: true,
               // pinned:width <= 1024 ?'':'left',
                //pinned:'left',
                cellRenderer: checkboxCellRenderer,
                width:15, 
            },
            {
                headerName: "Name",
                field: "name",
                sortable: true,
                filter: "agTextColumnFilter",
                hide: true,
                filterParams: setTextFilterParams,
               // pinned:width <= 1024 ?'':'left',
            },
            {
                headerName: "PhD Institution",
                field: "PhD Institution",
                rowDrag: false,
                sortable: true,
                filter: 'agTextColumnFilter',
                hide:true,
                filterParams: setTextFilterParams,
            },
            {
                headerName: "PhD Year",
                field: "PhD Year",
                rowDrag: false,
                sortable: true,
                filter: "agTextColumnFilter",
                hide:true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Application Date",
                field: "Application Date",
                rowDrag: false,
                sortable: true,
                filter: "agDateColumnFilter",
                hide:true,
                filterParams: setDateFilterParams,
                valueFormatter:dateFormatter
            },
            
            {
                headerName: "Current Position",
                field: "Current Position",
                rowDrag: false,
                sortable: true,
                filter: true,
                filter: 'agTextColumnFilter',
                hide:true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Status",
                field: "Status",
                rowDrag: false,
                sortable: true,
                hide:true,
                filter: true,
                cellRenderer:statusCellRenderer
            },
            {
                headerName: "Area of Expertise",
                field: "Area of Expertise",
                rowDrag: false,
                sortable: true,
                filter: 'agTextColumnFilter',
                hide:true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Citizenship",
                field: "Citizenship",
                rowDrag: false,
                sortable: true,
                filter: true,
                hide:true,
                filter: 'agTextColumnFilter',
                filterParams: setTextFilterParams,
            },
            {
                headerName: "Region of Citizenship",
                field: "Region of Citizenship",
                rowDrag: false,
                sortable: true,
                filter: 'agTextColumnFilter',
                hide:true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Assignee",
                field: "Assignee",
                rowDrag: false,
                sortable: true,
                filter: 'agTextColumnFilter',
                hide:true,
                filterParams: setTextFilterParams
            },
            {
                headerName: "Due Date",
                field: "Due Date",
                rowDrag: false,
                sortable: true,
                filter: "agDateColumnFilter",
                hide:true,
                filterParams: setDateFilterParams,
                valueFormatter:dateFormatter
            },
            {
                headerName: "Gender",
                field: "Gender",
                rowDrag: false,
                sortable: true,
                hide:true,
                filter: true
            },
            {
                headerName: "Phd Subject",
                field: "Phd Subject",
                rowDrag: false,
                sortable: true,
                hide:true,
                filter: true,
                filter: 'agTextColumnFilter',
                filterParams: setTextFilterParams,
            },


          
            // {
            //     headerName: "Current Position",
            //     field: "Current Position",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: true,
            //     filter: 'agTextColumnFilter',
            //     hide: true,
            //     filterParams: setTextFilterParams
            // },
            // {
            //     headerName: "Citizenship",
            //     field: "Citizenship",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: true,
            //     hide: true,
            //     filter: 'agTextColumnFilter',
            //     filterParams: setTextFilterParams,
            // },
            // {
            //     headerName: "PhD Year",
            //     field: "PhD Year",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: "agTextColumnFilter",
            //     hide: true,
            //     filterParams: setTextFilterParams
            // },
            // {
            //     headerName: "Gender",
            //     field: "Gender",
            //     rowDrag: false,
            //     sortable: true,
            //     hide: true,
            //     filter: true
            // },
            // {
            //     headerName: "Phd Subject",
            //     field: "Phd Subject",
            //     rowDrag: false,
            //     sortable: true,
            //     hide: true,
            //     filter: true,
            //     filter: 'agTextColumnFilter',
            //     filterParams: setTextFilterParams,
            // },
            // {
            //     headerName: "Status",
            //     field: "Status",
            //     rowDrag: false,
            //     sortable: true,
            //     hide: true,
            //     filter: true,
            //     cellRenderer:statusCellRenderer
            // },
            // {
            //     headerName: "PhD Institution",
            //     field: "PhD Institution",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: 'agTextColumnFilter',
            //     hide: true,
            //     filterParams: setTextFilterParams,
            // },
            // {
            //     headerName: "Application Date",
            //     field: "Application Date",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: "agDateColumnFilter",
            //     hide: true,
            //     filterParams: setDateFilterParams,
            //     valueFormatter: dateFormatter
            // },
            // {
            //     headerName: "Area of Expertise",
            //     field: "Area of Expertise",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: 'agTextColumnFilter',
            //     hide: true,
            //     filterParams: setTextFilterParams
            // },
            // {
            //     headerName: "Region of Citizenship",
            //     field: "Region of Citizenship",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: 'agTextColumnFilter',
            //     hide: true,
            //     filterParams: setTextFilterParams
            // },
            // {
            //     headerName: "Assignee",
            //     field: "Assignee",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: 'agTextColumnFilter',
            //     hide: true,
            //     filterParams: setTextFilterParams
            // },
            // {
            //     headerName: "Due Date",
            //     field: "Due Date",
            //     rowDrag: false,
            //     sortable: true,
            //     filter: "agDateColumnFilter",
            //     hide: true,
            //     filterParams: setDateFilterParams,
            //     valueFormatter: dateFormatter
            // }
        ],
        //suppressHorizontalScroll:true,
        rowSelection: 'multiple',
        domLayout: "autoHeight",
        api:gridApi,
        onRowClicked: (event) => history.push(`/Userdetails/${event.data.id}`),
        //onSelectionChanged: (event)=>{console.log(event)},
        //onRowSelected: (event)=>{console.log(event)}

    }



    const getListingData = (params) => {
        if (params === null && gridColumnApi === null) {
            return;
        } else {
            if (params === null) {
                params = gridColumnApi
                params.setColumnsVisible(['Citizenship', 'PhD Year', 'Gender', 'Status', 'name', 'Current Position', 'Due Date', 'Assignee', 'Region of Citizenship', 'Area of Expertise', 'Application Date', 'PhD Institution', 'Phd Subject'], false)
            }
        }
        const data = {
            "gid": id
        }
        const options = {
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "",
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            }
        }
        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_PROJECT_LIST_URL, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
        )

            .then(res => {
                // console.log(res.data)
                // setListingData(res.data);

                // var students = [];
                // var result = res.data.map(({ fieldDetails }) => fieldDetails);
                // console.log(result)
                // result.map((item, index) => {
                //     students.push({
                //         "id": res.data[index].gid,
                //         "name": item[0].value,
                //         "age": parseInt(item[1].value),
                //         "currentposition": item[2].value,
                //         "Citizenship": item[3].value,
                //         "PhDInstitutionYear": item[4].value,
                //         "gender": item[5].value,
                //         "PhdSubject": item[6].value,
                //         "status": item[7].value
                //     });
                // })

                // console.log(students)
                // setRowData(students);

                //console.log(res.data)
                setListingData(res.data);

                var students = [];
                var result = res.data.map(({ fieldDetails }) => fieldDetails);

                result[0].map((item, index) => {
                    //console.log(item.name)
                    params.setColumnVisible(item.name, true)
                })
                result.map((item, index) => {
                    //console.log(item)
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
                    //console.log(Object.keys(temp[1]))
                    let k = Object.keys(temp[1])
                    let v = Object.values(temp[1])
                    //console.log(`${v[0]}===${k[0]}`)
                    students.push(sn)

                })


                setRowData(students);
            })
            .catch(err => {
                console.log(err);
            })




    }
    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        //getListingData();
        getListingData(params.columnApi)
    }

    const getRowNodeId = (data) => {
        return data.id;
    }


    const handleChangeAssign = (event) => {
        setAssign(event.target.value);
    };
    const getInitial = () => {
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
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_USER_LIST_URL, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
        )

            .then(res => {
                //console.log(res.data)
                setassignList(res.data)

            })
            .catch(err => {
                console.log(err);
            })
    }

    const SubmitAssign = () => {
        let flagA = true;

       // console.log(selectedDate)
        let assignArr = []
        let selectedNodes = gridApi.getSelectedNodes();
        let selectedData = selectedNodes.map(node => node.data);
        if (selectedDate === undefined || selectedDate === null) {
            setAssignDateMsg('Please choose a date')
            flagA = false;
        } else {
            setAssignDateMsg('')
        }
        if (Assign === null || Assign === '') {
            setAssignMsg('Please select an assigner')
            flagA = false;
        } else {
            setAssignMsg('');
        }
        if (selectedData.length === 0) {
            setAssignListMsg('Please select at least one record')
            flagA = false;
        } else {
            setAssignListMsg('')
        }
        if (flagA) {
            selectedData.map((item, index) => {
                assignArr.push({
                    "gid": item.id,
                    "assignee": Assign,
                    "dueDate": moment(selectedDate).format()
                });
            })


            const options = {
                headers: {
                    "cache-control": "no-cache",
                    "Content-Type": "application/json;charset=utf-8",
                    "Access-Control-Allow-Origin": "",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                }
            }
            Axios.post(
                process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_ASSIGN_DATE_URL, assignArr, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }
            }
            )

                .then(res => {
                    //console.log(res.data)
                    setmsg("Assigned successfully")
                    setOpen(true)
                    getListingData(null)
                    setSelectedDate(null)
                    setAssign('')
                    setassignList([])
                    getInitial()
                    gridOptions.api.deselectAll();
                })
                .catch(err => {
                    console.log(err);
                    setseverity('error')
                    setmsg("Some error has been occurred")
                    setOpen(true)
                    
                })
            console.log(assignArr)
        }
        //return selectedData;
    }

    const getProjectName = () => {
        const data = {
            "gid": id
        }

        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_GET_PROJECT_URL, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
        )

            .then(res => {
                //console.log(res.data.name)
                setprojectname(res.data.name)

            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const ShowMenu = () => {
        if (Menupos) {
            setMenupos(false)
        } else {
            setMenupos(true)
        }

    }

    const getProjectRole = () => {
        const data = {
            "projectId": id
        }

        Axios.post(
            process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_POST_ACTIVITY_ROLE_LISTING_URL, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
        )

            .then(res => {
                //console.log(res.data.name)
                //setIsAssignAllowed
                //setButtonList
                //setRole(res.data)
                let assign = res.data.filter(m => m.type === 'Dropdown' && m.name === 'Assignee')
                let rolelist = res.data.filter(m => m.type === 'Button' && m.name !== 'Send Email')
                if (assign.length > 0) {
                    setIsAssignAllowed(true)
                }
                setButtonList(rolelist)
                //console.log(assign)
                //console.log(rolelist)
            })
            .catch(err => {
                console.log(err.response.status);
                console.log(err.response.data);
            })
    }

    const OpenComment = (status)=>{
        setCommentOpen(true)
        setButtonStatus(status)
        setPopUpButtonClickStatus(false)
    }

    const ChangeComments = (e) =>{
        setComments(e.target.value)
    }

    const UpdateStatus = (status) => {
        let flagA = true;

        //console.log(status)
        let assignArr = []
        let selectedNodes = gridApi.getSelectedNodes();
        let selectedData = selectedNodes.map(node => node.data);
        if (selectedData.length === 0) {
            setUpdateListMsg('Please select at least one record')
            flagA = false;
        } else {
            setUpdateListMsg('')
        }
        // if (Comments.trim() === '') {
        //     setCommentMsg('Please enter notes')
        //     flagA = false;
        // } else {
        //     setCommentMsg('')
        // }

        if (flagA && PopUpButtonClickStatus==false) {
            
            setPopUpButtonClickStatus(true)

            selectedData.map((item, index) => {
                assignArr.push({
                    "gid": item.id,
                    "decision": status,
                    "notes": `${Comments}`,
                    "decisionDate": moment()
                });
            })
            //console.log(assignArr)
            const options = {
                headers: {
                    "cache-control": "no-cache",
                    "Content-Type": "application/json;charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer " + localStorage.getItem('Token')
                }
            }

            Axios.post(
                process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_API_UPDATEDECISION_PROJECT_URL, assignArr, options
            )
                .then((response) => {
    
                    //console.log(response)
                    setseverity('success')
                    setCommentOpen(false)
                    setComments('')
                    getListingData(null)
                    gridOptions.api.deselectAll();
                    setmsg("Status updated successfully")
                    setOpen(true)
                    setPopUpButtonClickStatus(false)
    
                })
                .catch((error) => {
                    console.log(error)
                })
        }


    }
    const CloseBox = ()=>{
        setCommentOpen(false)
        setCommentMsg('')
        setUpdateListMsg('')
        setPopUpButtonClickStatus(false)
    }


    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {msg}
                </Alert>
            </Snackbar>
            <div className="container-scroller">
                <Left isShow={(Menupos1)?"sidebar-icon-only":""} />
                <div class="container-fluid page-body-wrapper">
                    <div id="theme-settings" class="settings-panel">
                        <i class="settings-close mdi mdi-close"></i>
                        <p class="settings-heading">SIDEBAR SKINS</p>
                        <div class="sidebar-bg-options selected" id="sidebar-default-theme">
                            <div class="img-ss rounded-circle bg-light border mr-3"></div> Default
                        </div>
                        <div class="sidebar-bg-options" id="sidebar-dark-theme">
                            <div class="img-ss rounded-circle bg-dark border mr-3"></div> Dark
                        </div>
                        <p class="settings-heading mt-2">HEADER SKINS</p>
                        <div class="color-tiles mx-0 px-4">
                            <div class="tiles light"></div>
                            <div class="tiles dark"></div>
                        </div>
                    </div>
                    
                    <div class="main-panel">

                   

                     <div class="try fixed-top content-wrapper pb-0">

                       <article>
                            <div class="top-box-line">
                                
                        <nav class="left100 navbar flex-row">
                            <div class="navbar-menu-wrapper d-flex align-items-stretch justify-content-between">
                            {/* <Link to={"#"} class="navbar-brand brand-logo-mini align-self-center d-lg-none" href="index.html"><img src={logos} alt="" /></Link>
                            <button class="navbar-toggler navbar-toggler align-self-center mr-2" type="button" onClick={() => ShowMenu1()}>
                                <i class="mdi mdi-menu"></i>
                            </button> */}
                            <a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="index.html"><img src={logos} alt="" /></a>
                            <button className="navbar-toggler navbar-toggler align-self-center mr-2" type="button" onClick={() => ShowMenu1()}>
                                <i className="mdi mdi-menu"></i>
                            </button>


                            <ul class="navbar-nav">

                                <li class="nav-item nav-search border-0 ml-1 ml-md-3 ml-lg-5 d-none d-md-flex">
                                    <form class="nav-link form-inline mt-2 mt-md-0">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Search" />
                                            <div class="input-group-append">
                                                <span class="input-group-text">
                                                    <i class="mdi mdi-magnify"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </li>
                            </ul>
                            <ul class="navbar-nav navbar-nav-right ml-lg-auto">
                                <li class="nav-item dropdown">
                                    <Link to={"#"} class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" data-toggle="dropdown">
                                        <i class="mdi mdi-bell-outline"></i>
                                    </Link>
                                    <div class="dropdown-menu navbar-dropdown navbar-dropdown-large preview-list" aria-labelledby="notificationDropdown">
                                        <h6 class="p-3 mb-0">Notifications</h6>
                                        {/* <Link to={"#"} class="dropdown-item preview-item">
                                            <div class="preview-thumbnail">
                                                <img src="images/faces/face4.jpg" alt="" class="profile-pic" />
                                            </div>
                                            <div class="preview-item-content">
                                                <p class="mb-0"> Dany Miles <span class="text-small text-muted">commented on your photo</span>
                                                </p>
                                            </div>
                                        </Link>
                                        <Link to={"#"} class="dropdown-item preview-item">
                                            <div class="preview-thumbnail">
                                                <img src="images/faces/face3.jpg" alt="" class="profile-pic" />
                                            </div>
                                            <div class="preview-item-content">
                                                <p class="mb-0"> James <span class="text-small text-muted">posted a photo on your wall</span>
                                                </p>
                                            </div>
                                        </Link>
                                        <Link to={"#"} class="dropdown-item preview-item">
                                            <div class="preview-thumbnail">
                                                <img src="images/faces/face2.jpg" alt="" class="profile-pic" />
                                            </div>
                                            <div class="preview-item-content">
                                                <p class="mb-0"> Alex <span class="text-small text-muted">just mentioned you in his post</span>
                                                </p>
                                            </div>
                                        </Link> */}
                                        <div class="dropdown-divider"></div>
                                        <p class="p-3 mb-0">View all activities</p>
                                    </div>
                                </li>
                                <li class="nav-item dropdown d-none d-sm-flex">
                                    <Link to={"#"} class="nav-link count-indicator dropdown-toggle" id="messageDropdown" data-toggle="dropdown">
                                        <i class="mdi mdi-email-outline"></i>
                                    </Link>
                                    <div class="dropdown-menu navbar-dropdown navbar-dropdown-large preview-list" aria-labelledby="messageDropdown">
                                        <h6 class="p-3 mb-0">Messages</h6>
                                        <Link to={"#"} class="dropdown-item preview-item">
                                            <div class="preview-item-content flex-grow">
                                                <span class="badge badge-pill badge-success">Request</span>
                                                <p class="text-small text-muted ellipsis mb-0"> Suport needed for user123 </p>
                                            </div>
                                            <p class="text-small text-muted align-self-start"> 4:10 PM </p>
                                        </Link>
                                        <Link to={"#"} class="dropdown-item preview-item">
                                            <div class="preview-item-content flex-grow">
                                                <span class="badge badge-pill badge-warning">Invoices</span>
                                                <p class="text-small text-muted ellipsis mb-0"> Invoice for order is mailed </p>
                                            </div>
                                            <p class="text-small text-muted align-self-start"> 4:10 PM </p>
                                        </Link>
                                        <Link to={"#"} class="dropdown-item preview-item">
                                            <div class="preview-item-content flex-grow">
                                                <span class="badge badge-pill badge-danger">Projects</span>
                                                <p class="text-small text-muted ellipsis mb-0"> New project will start tomorrow </p>
                                            </div>
                                            <p class="text-small text-muted align-self-start"> 4:10 PM </p>
                                        </Link>
                                        <h6 class="p-3 mb-0">See all activity</h6>
                                    </div>
                                </li>

                                <li class="nav-item nav-profile dropdown border-0">
                                    <Link onClick={() => ShowMenu()} to={"#"} className="nav-link dropdown-toggle" id="profileDropdown" data-toggle="dropdown">
                                    {
                                        localStorage.getItem("photoURL") !=undefined && localStorage.getItem("photoURL").length>0?
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
                            <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                                <span class="mdi mdi-menu"></span>
                            </button>
                        </div>
                            </nav>

                           



                            <div class="page-header flex-wrap">
                                <div class="left50">
                                    <h3>{projectname}</h3>
                                    </div>                   
                                </div>   

                            
                                <div class="left50">
                                <div class="filter">
                                {IsAssignAllowed &&  <>
                                <div class="select-assign">
                                {AssignMsg !== '' && <label className="mass">{AssignMsg}</label>}
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={Assign}
                                        onChange={handleChangeAssign}
                                        displayEmpty
                                    >
                                        <MenuItem value="">
                                            <em>Select Assignee</em>
                                        </MenuItem>
                                        {
                                            assignList?.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.userId}>{item.fristName} {item.lastName}</MenuItem>
                                                );
                                            })
                                        }

                                    </Select>
                                   
                                </div>
                                <div class="assign">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    {AssignDateMsg !== '' && <label className="mass">{AssignDateMsg}</label>}
                                        <Grid container justifyContent="space-around">

                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Select Assign Date"
                                                format="MM/dd/yyyy"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                            
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="primary">
                                    {AssignListMsg !== '' && <label className="mass">{AssignListMsg}</label>}
                                    <Button variant="contained" color="primary" onClick={() => SubmitAssign()}>
                                        Assign
                                    </Button>
                                </div>
                                </>}
                            </div>
                                </div>




                                <div className="qw2 bbr d-flex">
                                    <div className="submite5">
                                        
                                        {
                                            ButtonList !== undefined && ButtonList.length > 0 ? ButtonList.map((item, index) => <Link className={item.css} key={index} onClick={() => OpenComment(`${item.name}`)} to={"#"}>{`${item.name}`}</Link>) : <></>
                                        }

                                    </div>
                                    {CommentOpen && <div className="CommentMsg">
                                        {UpdateListMsg !== '' && <label>{UpdateListMsg}</label>}
                                        {CommentMsg !== '' && <label>{CommentMsg}</label>}
                                        <div className="name">Notes</div>
                                        <input type="text" value={Comments} maxLength="150" onChange={(e) => ChangeComments(e)} />
                                        <input type="button" value="Submit" onClick={() => UpdateStatus(`${ButtonStatus}`)} />
                                       
                                        <div className="close-img"><Link to={"#"} onClick={()=>CloseBox()}><img src={close} alt="" /></Link></div>
                                    </div>}
                                    <Link to={"/"} onClick={() => history.goBack()}><img src={back} alt="" /></Link>
                                    </div>

                                
                              
                            </div>
                            
                            <div class="clr"></div>    
                       </article>
                        
                       </div>       














                           
                       <div class="content-wrapper top-pad-off pb-0">
                                              
                            <div class="row">
                                <div class="col-xl-12 col-sm-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body px-0 overflow-auto">
                                            <div class="table-responsive">
                                                <div className="ag-theme-alpine" id='mn' style={{height:height-210}}>
                                                    {width>1024 && <AgGridReact 
                                                        gridOptions={gridOptions}
                                                        immutableData={true}
                                                        getRowNodeId={getRowNodeId}
                                                        rowData={rowData}
                                                        onGridReady={onGridReady}></AgGridReact>}
                                                         {width<=1024 && <AgGridReact 
                                                        gridOptions={gridOptionsMobile}
                                                        immutableData={true}
                                                        getRowNodeId={getRowNodeId}
                                                        rowData={rowData}
                                                        onGridReady={onGridReady}></AgGridReact>}
                                                </div>

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

        </>
    );
}

export default Listing;