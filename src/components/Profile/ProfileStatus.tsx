import React, {ChangeEvent} from 'react';
import {RootState} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {setStatus} from '../../redux/profile-reducer';
import axios from 'axios';


type ProfileStatusPropsType = {
    status: string
    userId: number
    setStatus: (status: string) => void
}

class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state = {
        status: this.props.status,
        editMode: false
    }


    activateEditMode() {
        this.setState({
            editMode: true
        })
    }

    deActivateEditMode() {
        this.setState({
            editMode: false
        })
        axios.put(`https://social-network.samuraijs.com/api/1.0/profile/status`, {status: this.state.status}, {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        }).then(response => {
            if(response.data.resultCode===0){
                this.props.setStatus(this.state.status)
            }
        })
    }

    onStatusChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/status/${this.props.userId}`, {
            withCredentials: true,
            headers: {
                'API-KEY': 'b1356b5e-074b-4608-a733-39db627817e8'
            }
        }).then(response => {
            this.props.setStatus(response.data)
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        console.log(this.state)
        return (
            <div className={'profile'}>

                {
                    this.state.editMode
                        ? <input type="text"
                                 autoFocus
                                 value={this.state.status}
                                 onChange={this.onStatusChange.bind(this)}
                                 onBlur={this.deActivateEditMode.bind(this)}
                        />
                        : <span onDoubleClick={this.activateEditMode.bind(this)}>status: {this.state.status}</span>
                }

            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        status: state.profilePage.status
    }
}

export default connect(mapStateToProps, {
    setStatus
})(ProfileStatus)