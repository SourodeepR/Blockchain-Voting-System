import React, { Component, useState } from "react";
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Button, Icon } from "semantic-ui-react";
import CandidateForm from "./candidateform";

class CandidatePrompt extends Component {
    state = {
        open: false
    };

    handleClickToOpen = () => {
        this.setState({ open: true });
    };

    handleClickToClose = () => {
        this.setState({ open: false });
    };

    render() {
        //console.log(this.props.address);
        return (
            <div>
                <Button
                    floated="right"
                    content="Add Candidate"
                    icon="add circle"
                    color="violet"
                    onClick={this.handleClickToOpen}
                />
                <Dialog open={this.state.open} onClose={this.handleClickToClose}>
                    <DialogTitle >Fill All Details </DialogTitle>
                    <DialogContent>
                        <CandidateForm handleClickToClose={this.handleClickToClose} address={this.props.address}></CandidateForm>
                    </DialogContent>
                </Dialog>
            </div>

        );
    }

}

export default CandidatePrompt;