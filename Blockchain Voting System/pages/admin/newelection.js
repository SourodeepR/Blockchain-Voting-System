import React, { Component } from "react";
import { Button, Form, Message, Input } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';
import Logout from "../../components/Logout";
class ElectionNew extends Component {
    state = {
        adminName: '',
        adminTitle: '',
        electionTitle: '',
        organizationTitle: '',
        constituency: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
            await factory.methods.createElectionContract(
                this.state.adminName, this.state.adminTitle, this.state.electionTitle,
                this.state.organizationTitle, this.state.constituency)
                .send({
                    from: accounts[0]
                });

            Router.pushRoute('/admin/elections');
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }

        this.setState({ loading: false });
    };

    render() {
        return (
            <Layout>
                <Logout />
                <h3>Create New Election</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field required>
                        <label>Admin Name</label>
                        <Input
                            value={this.state.adminName}
                            onChange={event => this.setState({ adminName: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>Admin Title</label>
                        <Input
                            value={this.state.adminTitle}
                            onChange={event => this.setState({ adminTitle: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>Election Title</label>
                        <Input
                            value={this.state.electionTitle}
                            onChange={event => this.setState({ electionTitle: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>Organistation Title</label>
                        <Input
                            value={this.state.organizationTitle}
                            onChange={event => this.setState({ organizationTitle: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>Constituency</label>
                        <Input
                            value={this.state.constituency}
                            onChange={event => this.setState({ constituency: event.target.value })}
                        />
                    </Form.Field>

                    <Message error header="Oops !!" content={this.state.errorMessage} />

                    <Button loading={this.state.loading} color="violet">Create</Button>
                </Form>

            </Layout>
        )
    }
}

export default ElectionNew;