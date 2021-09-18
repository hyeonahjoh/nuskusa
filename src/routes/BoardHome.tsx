import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { authService, dbService } from '../utils/firebaseFunctions';

type BoardObject = {
    title: string,
    description: string,
}

type BoardHomeProps = {
    role: string
}

type BoardHomeState = {
    boardArray: BoardObject[],
    boardComponentArray: any[],
    title: string,
    description: string,
}

class BoardHome extends React.Component<BoardHomeProps, BoardHomeState> {
    state: BoardHomeState = {
        boardArray: [],
        boardComponentArray: [],
        title: '',
        description: '',
    }

    componentDidMount = () => {
        this.fetchBoards();
    }

    fetchBoards = () => {
        dbService
            .collection('boards')
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const arr: BoardObject[] = [];
                    const componentArray: any[] = [];
                    let key = 0;
                    querySnapshot.docs.forEach((doc) => {
                        const data = doc.data() as BoardObject;
                        const component = (
                            <div key={key}>
                                <Link to={`/boards/${data.title}`}>{data.title}</Link>
                                {/* put a modal for editing this board */}
                            </div>
                        )
                        key++;
                        arr.push(data);
                        componentArray.push(component);
                    })
                    this.setState({
                        boardArray: arr,
                        boardComponentArray: componentArray
                    })
                    console.log('all boards fetching successful')
                }
            })
    }

    handleChange = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === 'title') {
            this.setState({
                title: value
            })
        }
        else if (name === 'description') {
            this.setState({
                description: value
            })
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        const { title, description } = this.state
        const permissionsArray: any[] = [];
        document.querySelectorAll('input[class=board-permissions]:checked')
            .forEach((element: any) => {
                permissionsArray.push(element.value);
            });
        dbService.collection('boards').doc(title).set({
            title: title,
            description: description,
            permissions: permissionsArray
        })
    }

    render = () => {
        return (
            <div>
                <Navbar />
                {console.log(this.props.role)}
                {this.state.boardComponentArray}
                {this.props.role === 'Admin' ?
                    <form onSubmit={this.handleSubmit}>
                        <input name='title' type='string' onChange={this.handleChange} />
                        <input name='description' type='string' onChange={this.handleChange} /> <br />
                        Who can view this board? <br />
                        <input name='permissions' className='board-permissions' type='checkbox' value='User' />
                        <input name='permissions' className='board-permissions' type='checkbox' value='Undergraduate' />
                        <input name='permissions' className='board-permissions' type='checkbox' value='Graduate' />
                        <input type='submit' />
                    </form>
                    :
                    <div>Waiting</div>
                }
            </div>
        )
    }
}

export default BoardHome;