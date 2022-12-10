import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
import Election from '../../ethereum/build/Election.json';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import Layout from "../../components/Layout";
import ElecList from '../../components/admin/elecList';
import { Link } from '../../routes.js';
import Logout from "../../components/Logout";
class ElectionIndex extends Component {

    render() {

        return (
            <>
                <Layout>
                    <Logout />
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60px' }}>
                            <h2 >Elections</h2>

                        </div>

                        <Link route="/admin/newelection">
                            <a>
                                <Button
                                    floated="right"
                                    content="Create New Election"
                                    icon="add circle"
                                    color="violet"
                                />
                            </a>
                        </Link>

                        <ElecList />
                    </div>
                </Layout>



            </>


        );
    }
}

export default ElectionIndex;