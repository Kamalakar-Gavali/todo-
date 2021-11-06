import { useState } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Wrapper = styled.div`
width: 100%;
max-width: 608px;
display: flex;
flex-direction: column;
justify-content: center;
font-family:Montserrat;
padding:10px;
margin:0 auto;
& hr{
    margin:0px 0px 30px 0px;
}

`;


const Heading = styled.h1`
font-family: Raleway;
font-style: normal;
font-weight: bold;
font-size: 36px;
line-height: 42px;
text-align: center;
letter-spacing: -0.045em;


color: #333333;
`;
const StatusStrip = styled.div`

display:flex;
justify-content:space-around;

& .status{
    display:flex;
    flex-direction:column;
    cursor:pointer;
    & p{
        font-weight: 600;
    //   font-size: 14px;
    font-family:inherit;
    }
    & div{
    width: 89px;
    height: 4px;

    background: #2F80ED;
    border-radius: 4px 4px 0px 0px;
    &.show{
        visibility:visible;
    }
    &.hide{
        visibility:hidden;
    }
    }
}
`;
const InputArea = styled.div`

display:flex;
justify-content:space-between;
width:100%;
// margin:30px 0px;
&.show{
    display:flex;  
   }
&.hide{
       display:none
 }
@media screen and (max-width:600px)
{
    flex-direction:column;
    height:140px;
    justify-content:space-between;
    align-items:center;
}

& div{

    @media screen and (max-width:600px)
{
 width:100%
}
& input{
padding:20px 12px;
width:476px;

border: 1px solid #BDBDBD;
box-sizing: border-box;
border-radius: 12px;
color: #828282;
font-size:17px;
font-family:inherit;
@media screen and (max-width:600px)
{
 width:100%
}
}


&.err{
    color: red;
    text-align: left;
    margin: 10px 5px;
}
}
& button{
color:white;
    background: #2F80ED;
box-shadow: 0px 2px 6px rgba(127, 177, 243, 0.4);
border:1px solid #2F80ED;
border-radius: 12px;
width: 109px;

height: 56px;
font-weight: 600;
font-size: 14px;
cursor:pointer;
}
`;
const ListArea = styled.div`

text-align:left;
 

& div{
padding:20px 0px;
font-family:Montserrat;
font-size:18px;
display:flex;
align-items:center;
&.completeList{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0px;
    // margin-top:30px;
    & span{
        cursor:pointer;
        color:#BDBDBD;
    }
}


& input{
width: 20px;
height: 20px;
border: 1px solid #828282;
box-sizing: border-box;
border-radius: 4px;
cursor:pointer;

}
&>span{
    margin-left:20px;
    &.completed{
        text-decoration: line-through;
        }
    &.active{
        text-decoration: none;
    }    
}

}
& .deleteAll-btn{
display:flex;
justify-content:flex-end;
button{
    width: 124px;
height: 40px;
border:1px solid #EB5757;
background: #EB5757;
border-radius: 4px;
color:white;
display:flex;
align-items:center;
justify-content:space-around;
cursor:pointer;

}
}

`;

const Footer = styled.footer`
font-family: Montserrat;
font-style: normal;
font-weight: 500;
font-size: 14px;
text-align: center;
color: #A9A9A9;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 10px;
&>span{
    color:tomato;
    margin:0px 5px;
}
`;

const Container = () => {


    const [paneState, setPaneState] = useState([true, false, false])
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('taskList')) || []);
    const [task, setTask] = useState('');
    const [err, setErr] = useState(false);
    let statusList = ['All', 'Active', 'Completed'];

    const changePane = (index) => {
        let tempState = [...new Array(paneState.length)];
        tempState[index] = true;
        setPaneState(tempState);

    }
    const addToTaskList = (task) => {

        let temptaskList = taskList.slice();
        if (task.trim() != '') {
            temptaskList.push({ name: task, status: 'active' });
            setTaskList(temptaskList);
            setErr(false)
            localStorage.setItem('taskList', JSON.stringify(temptaskList))
        }
        else {
            setErr(true)
        }
        setTask('');
    }

    const changeStatus = (index) => {
        console.log('old', taskList);
        // debugger;
        let temptaskList = taskList.slice();

        if (temptaskList[index].status == 'active') {
            temptaskList[index].status = 'completed';
        }
        else {
            temptaskList[index].status = 'active';
        }
        console.log("new", temptaskList)
        setTaskList(temptaskList);
        localStorage.setItem('taskList', JSON.stringify(temptaskList))
        // setTask('');
    }

    const deleteFromTaskList = (index) => {
        let temptaskList = taskList.slice();
        temptaskList.splice(index, 1);
        // temptaskList.filter((task)=>)
        setTaskList(temptaskList);
        localStorage.setItem('taskList', JSON.stringify(temptaskList))
    }
    return (
        <>
            <Wrapper>
                <Heading>#todo</Heading>
                <StatusStrip>
                    {
                        statusList.map((text, index) =>
                            <div className='status' onClick={() => changePane(index)}>
                                <p>{text}</p>
                                <div className={paneState[index] ? 'show' : 'hide'}></div>

                            </div>
                            // <button className={ paneState[index]&& 'border-bottom'} onClick={()=>changePane(index)}>{text}</button>
                        )
                    }

                </StatusStrip>
                <hr></hr>

                <InputArea className={(paneState[0] || paneState[1]) ? 'show' : 'hide'}>

                    <div>
                        <input placeholder='add details' value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={(e) => e.keyCode == 13 && addToTaskList(task)} />
                        {err &&
                            <div className='err'>Enter task</div>
                        }
                    </div>

                    <button onClick={() => addToTaskList(task)}>Add</button>

                </InputArea>
                <ListArea>
                    {
                        (taskList.length > 0) && taskList.map((task, index) => <>


                            {(paneState[0] || (paneState[1] && task.status == 'active')) && (
                                <div key={index} >
                                    <input type='checkbox' checked={task.status == 'completed' ? true : false} onClick={() => changeStatus(index)} />
                                    <span className={task.status == 'completed' ? 'completed' : 'active'}>{task.name}</span>
                                </div>
                            )
                            }
                            {
                                paneState[2] && task.status == 'completed' && (<>
                                    <div className='completeList'>
                                        <div key={index} >
                                            <input type='checkbox' checked={task.status == 'completed' ? true : false} onClick={() => changeStatus(index)} />
                                            <span className={task.status == 'completed' ? 'completed' : 'active'}>{task.name}</span>
                                        </div>
                                        <span><DeleteIcon onClick={() => deleteFromTaskList(index)} /></span>
                                    </div>

                                </>
                                )
                            }
                        </>
                        )
                    }
                    {paneState[2] && (taskList.length > 0) && (taskList.filter(task => task.status == 'completed').length > 0) && (
                        <div className='deleteAll-btn'>
                            <button onClick={() => { setTaskList([]); localStorage.setItem('taskList', JSON.stringify([])) }}><span><DeleteIcon /></span> Delete All</button>
                        </div>
                    )
                    }
                </ListArea>

            </Wrapper>
            <Footer>Created with <span><FavoriteIcon /></span> by Kamalakar Gavali</Footer>
        </>
    )

}

export default Container;
