import React, {Component} from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/es/CssBaseline/CssBaseline";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import Input from "@material-ui/core/es/Input/Input";
import FormHelperText from "@material-ui/core/es/FormHelperText/FormHelperText";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Button from "@material-ui/core/es/Button/Button";
import Grid from "@material-ui/core/es/Grid/Grid";
import ClickAwayListener from "@material-ui/core/es/ClickAwayListener/ClickAwayListener";


const API = "https://sheets.googleapis.com/v4/spreadsheets/133sgo5Rt-2QfCLRaBfVM-Oc6Wo7-DQOxcGWJCvTqGcU/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=AIzaSyDkiNMgNr_MqBr3svQitOxKyj9xIUhdreY";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 10,
        marginBottom: theme.spacing.unit * 5,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    appBarTypography: {
        padding: theme.spacing.unit * 1.5,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 5,
        padding: theme.spacing.unit * 1.5,
    },
    footer: {
        width: '100%',
        position: 'sticky',
    },
    error:{
        marginTop: theme.spacing.unit * 3,
    },
});

class NetworkPortForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentNumber: '',
            studentNumberErrorText: 'E.g. 1234567',
            studentNumberError: false,
            port1: '',
            port1ErrorText: 'Please enter a port number between 61000-61999',
            port1Error: false,
            port2: '',
            port2ErrorText: 'Please enter a port number between 61000-61999',
            port2Error: false,
            studentNumberStateChange: false,
            port1StateChange: false,
            port2StateChange: false,
            universalError: '',
            items: [],
        };
        this.onStudentNumberChange = this.onStudentNumberChange.bind(this);
        this.onPort1Change = this.onPort1Change.bind(this);
        this.onPort2Change = this.onPort2Change.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    componentDidMount() {

    };

    onStudentNumberChange(event) {
        this.setState({studentNumberStateChange: true});
        const currentValue = event.target.value;

        if (currentValue.length <= 1 && !isNaN(currentValue)) {
            this.setState({
                studentNumber: currentValue,
                studentNumberError: false
            });
        } else if (!isNaN(currentValue)) {
            this.setState({
                studentNumber: currentValue,
                studentNumberError: false
            });
        } else {
            this.setState({studentNumberError: true});
        }
    };

    onPort1Change(event) {
        this.setState({port1StateChange: true});
        const currentValue = event.target.value;
        if (!isNaN(currentValue)) {
            this.setState({
                port1: currentValue,
                port1Error: false
            });
        } else {
        }
        // if (currentValue.startsWith('s')) {
        //     this.setState({
        //         port1: currentValue,
        //         port1Error: false
        //     });
        //     console.log(currentValue);
        // } else {
        //     this.setState({port1Error: true});
        // }
    };

    onPort2Change(event) {
        this.setState({port2StateChange: true});
        const currentValue = event.target.value;
        if (!isNaN(currentValue)) {
            this.setState({
                port2: currentValue,
                port2Error: false
            });

        } else {
        }
    };

    onSubmit(event) {
        event.preventDefault();
        this.handleClickAway();
        if(this.state.port1Error || this.state.port2Error || this.state.studentNumberError){
            this.setState({universalError: 'Your preferences were not submitted. Please check your responses and try again.'})
        }
        else{
            const rows = [];
            fetch(API).then(response => response.json()).then(data => {
                let batchRowValues = data.valueRanges[0].values;
                for (let i = 1; i < batchRowValues.length; i++) {
                    let rowObject = {};
                    for (let j = 0; j < batchRowValues[i].length; j++) {
                        rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                    }
                    rows.push(rowObject.Port1);
                    rows.push(rowObject.Port2);
                }

                // this.setState({ items: rows });
                if(rows.includes(this.state.port1, 0)){
                    console.log('port1 exist');
                }
                else{
                    console.log('port1 doesnt exists');
                }
            });
            console.log(this.state.items);
            console.log(this.state.port1);

            // fetch('https://r420e694oe.execute-api.ap-southeast-2.amazonaws.com/Deploy', {
            //     method: 'GET',
            //     mode: "cors",
            //     headers: {
            //         'content-type': 'application/json'
            //     }
            // })
            //     .then((response) => response.json())
            //     .then((responseJson) => {
            //         console.log(responseJson);
            //         this.setState({
            //             port1: '',
            //             port2: '',
            //             studentNumber: '',
            //             universalError: '',
            //         });
            //     });

            //TODO: RESET ALL STATES
        }

    }

    handleClickAway = () => {
        if (this.state.studentNumberStateChange) {
            if (this.state.studentNumber.length !== 7) {
                console.log('Invalid Student Number');
                this.setState({studentNumberErrorText: 'Invalid Student Number.', studentNumberError: true});
            }
            else{
                this.setState({studentNumberErrorText: 'E.g. 1234567', studentNumberError: false});
            }
        }
        if (this.state.port1StateChange) {
            if ((parseInt(this.state.port1) <= 61000) || (parseInt(this.state.port1) >= 61999)) {
                console.log('Invalid Port1 Number');
                this.setState({port1ErrorText: 'Invalid Port Number. Please Enter port between 61000-61999', port1Error: true});
            }
            else{
                console.log('Valid Port Number');
                this.setState({port1ErrorText: 'Please enter a number between 61000-61999', port1Error: false});
            }
        }
        if (this.state.port2StateChange) {
            if ((parseInt(this.state.port2) <= 61000) || (parseInt(this.state.port2) >= 61999)) {
                console.log('Invalid Port2 Number');
                this.setState({port2ErrorText: 'Invalid Port Number. Please Enter port between 61000-61999', port2Error: true});
            }
            else{
                console.log('Valid Port Number');
                this.setState({port2ErrorText: 'Please enter a number between 61000-61999', port2Error: false});
            }
        }

        if(this.state.port1StateChange && this.state.port2StateChange){
            if(this.state.port1 === this.state.port2){
                this.setState({port2ErrorText: 'Port 1 and Port 2 cannot be same. Please Choose a different Port 2', port2Error: true});
            }
            else{
                this.setState({port2ErrorText: 'Please enter a number between 61000-61999', port2Error: false});
            }
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <CssBaseline/>
                <AppBar position="static">
                    <Typography variant="h6" color="inherit" align={"center"} className={classes.appBarTypography}>
                        NETWORK PORT PREFERENCE SELECTOR
                    </Typography>
                </AppBar>

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Paper className={classes.root} elevation={3}>
                        <form className={classes.form} onSubmit={this.onSubmit}>

                            <FormControl margin={"normal"} fullWidth required>
                                <InputLabel error={this.state.studentNumberError}>Student Number</InputLabel>
                                <ClickAwayListener onClickAway={this.handleClickAway}>
                                    <Input
                                        label="Student Number"
                                        error={this.state.studentNumberError}
                                        id="simple-start-adornment"
                                        value={this.state.studentNumber}
                                        onChange={this.onStudentNumberChange}
                                    />
                                </ClickAwayListener>
                                <FormHelperText id="my-helper-text" error={this.state.studentNumberError}>{this.state.studentNumberErrorText}</FormHelperText>
                            </FormControl>


                            <FormControl margin={"normal"} fullWidth required>
                                <InputLabel error={this.state.port1Error}>Port 1</InputLabel>
                                <ClickAwayListener onClickAway={this.handleClickAway}>
                                    <Input
                                        label="Student Number"
                                        error={this.state.port1Error}
                                        id="simple-start-adornment"
                                        value={this.state.port1}
                                        onChange={this.onPort1Change}
                                    />
                                </ClickAwayListener>
                                <FormHelperText id="my-helper-text" error={this.state.port1Error}>{this.state.port1ErrorText}</FormHelperText>
                            </FormControl>

                            <FormControl margin={"normal"} fullWidth required>
                                <InputLabel error={this.state.port2Error}>Port 2</InputLabel>
                                <ClickAwayListener onClickAway={this.handleClickAway}>
                                    <Input
                                        label="Student Number"
                                        error={this.state.port2Error}
                                        id="simple-start-adornment"
                                        value={this.state.port2}
                                        onChange={this.onPort2Change}
                                    />
                                </ClickAwayListener>
                                <FormHelperText id="my-helper-text" error={this.state.port2Error}>{this.state.port2ErrorText}</FormHelperText>
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Submit Preference
                            </Button>
                            <Typography  className={classes.error} align={"center"} variant={"h6"} color={"error"}>{this.state.universalError}</Typography>
                        </form>
                    </Paper>
                </Grid>

                <div className={classes.footer}>
                    <Grid item xs={12}>
                        <Typography
                            variant="subheading"
                            component={'span'}
                            align={"center"}
                            color={"textPrimary"}
                        >
                            © 2019 Japan Patel
                        </Typography><br/>
                        <Typography
                            variant="subheading"
                            component={'span'}
                            align={"center"}
                            color={"textPrimary"}
                        >
                            Created to facilitate Network Programming Students Port allocation
                        </Typography>
                    </Grid>
                </div>
            </div>

        );
    }
}

export default withStyles(styles)(NetworkPortForm);
