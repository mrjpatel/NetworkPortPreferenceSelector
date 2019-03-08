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
});

class NetworkPortForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentNumber: '',
            studentNumberErrorText: '',
            studentNumberError: false,
            port1: '',
            port1ErrorText: '',
            port1Error: false,
            port2: '',
            port2ErrorText: '',
            port2Error: false,
        };
        this.onStudentNumberChange = this.onStudentNumberChange.bind(this);
        this.onPort1Change = this.onPort1Change.bind(this);
        this.onPort2Change = this.onPort2Change.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    componentDidMount() {
        // let api = "https://r420e694oe.execute-api.ap-southeast-2.amazonaws.com/Deploy";
        // fetch(api,{
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
        //         });
        //     });
    }

    onStudentNumberChange(event) {
        const currentValue = event.target.value;

        if (currentValue.length <= 1 && this.state.studentNumber.startsWith('s')) {
            this.setState({
                studentNumber: currentValue,
                studentNumberError: false
            });
        } else if (currentValue.startsWith('s')) {
            this.setState({
                studentNumber: currentValue,
                studentNumberError: false
            });
            console.log(currentValue);
        } else {
            this.setState({studentNumberError: true});
        }
    };

    onPort1Change(event) {
        const currentValue = event.target.value;
        if (currentValue.startsWith('s')) {
            this.setState({
                port1: currentValue,
                port1Error: false
            });
            console.log(currentValue);
        } else {
            this.setState({port1Error: true});
        }
    };

    onPort2Change(event) {
        const currentValue = event.target.value;
        if (currentValue.startsWith('s')) {
            this.setState({
                port2: currentValue,
                port2Error: false
            });
            console.log(currentValue);
        } else {
            this.setState({port2Error: true});
        }
    };

    onSubmit(event) {
        event.preventDefault();
        fetch('https://r420e694oe.execute-api.ap-southeast-2.amazonaws.com/Deploy', {
            method: 'GET',
            mode: "cors",
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    port1: '',
                    port2: '',
                    studentNumber: '',
                });
            });
    }

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
                                <InputLabel>Student Number</InputLabel>
                                <Input
                                    label="Student Number"
                                    error={this.state.studentNumberError}
                                    id="simple-start-adornment"
                                    value={this.state.studentNumber}
                                    onChange={this.onStudentNumberChange}
                                />
                                <FormHelperText id="my-helper-text">E.g. s3595854</FormHelperText>
                            </FormControl>

                            <FormControl margin={"normal"} fullWidth required>
                                <InputLabel>Port 1</InputLabel>
                                <Input
                                    label="Student Number"
                                    error={this.state.port1Error}
                                    id="simple-start-adornment"
                                    value={this.state.port1}
                                    onChange={this.onPort1Change}
                                />
                                <FormHelperText id="my-helper-text">Please enter a number between
                                    61000-61999</FormHelperText>
                            </FormControl>

                            <FormControl margin={"normal"} fullWidth required>
                                <InputLabel>Port 2</InputLabel>
                                <Input
                                    label="Student Number"
                                    error={this.state.port2Error}
                                    id="simple-start-adornment"
                                    value={this.state.port2}
                                    onChange={this.onPort2Change}
                                />
                                <FormHelperText id="my-helper-text">Please enter a number between
                                    61000-61999</FormHelperText>
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
