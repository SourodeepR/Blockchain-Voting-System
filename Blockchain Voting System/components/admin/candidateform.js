import React, { Component } from "react";
import { Button, Form, Message, Input } from "semantic-ui-react";
import Election from '../../ethereum/election';
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';



class CandidateForm extends Component {
    state = {
        name: '',
        age: 0,
        gender: '',
        imageurl: '',
        aadhar: '',
        party: '',
        errorMessage: '',
        loading: false
    };

    options = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'o', text: 'Other', value: 'other' },
    ]
    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            // console.log(accounts);
            const election = Election(this.props.address);
            console.log(this.state);
            await election.methods.addCandidate(
                this.state.name, this.state.age, this.state.gender,
                this.state.imageurl, this.state.aadhar, this.state.party)
                .send({
                    from: accounts[0]
                });

            this.props.handleClickToClose();
            Router.pushRoute(`/admin/${this.props.address}`);
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }

        this.setState({ loading: false });
    };

    fileSelectedHandler = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            console.log(img);
            this.setState({ imageurl: URL.createObjectURL(img) });
            console.log(this.state.imageurl);
        }
    };

    fileUploadHandler = () => {

    };

    selectChange = (event, data) => {
        this.setState({ gender: data.value })
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field required>
                    <label>Name</label>
                    <Input required
                        value={this.state.name}
                        onChange={event => this.setState({ name: event.target.value })}
                    />
                </Form.Field>
                <Form.Group widths='equal'>
                    <Form.Field required>
                        <label>Age</label>
                        <Input required
                            fluid
                            type='number'
                            min='25'
                            max='100'
                            value={this.state.age}
                            onChange={event => this.setState({ age: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Select
                        required
                        fluid
                        label='Gender'
                        options={this.options}
                        placeholder='Gender'
                        onChange={this.selectChange}
                    />
                </Form.Group>

                <Form.Field required>
                    <label>Aadhar Number</label>
                    <Input required
                        value={this.state.aadhar}
                        onChange={event => this.setState({ aadhar: event.target.value })}
                    />
                </Form.Field>
                <Form.Field required>
                    <label>Party</label>
                    <Input required
                        value={this.state.party}
                        onChange={event => this.setState({ party: event.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Profile Image</label>
                    <Input
                        type='file'
                        onChange={this.fileSelectedHandler}
                    />
                    <Button
                        onClick={this.fileUploadHandler}
                    >Upload</Button>
                </Form.Field>

                <Message error header="Oops !!" content={this.state.errorMessage} />


                <Button loading={this.state.loading} color="violet" floated="right">Create</Button>
            </Form>

        )
    }
}

export default CandidateForm;