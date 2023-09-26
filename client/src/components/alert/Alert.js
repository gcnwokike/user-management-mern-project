import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <Box
      align="center"
      key={alert.id}
      style={{
        backgroundColor: "red",
        color: "#F8F8F8",
        margin: "1rem 0",
        padding: "2px 2px 2px 2px",
        fontWeight: "bold"
      }}
    >
      {alert.msg}
    </Box>
  ));

/*{
  return <Typography align="center" style={{ color: "red" }}></Typography>;
};
*/
Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});
export default connect(mapStateToProps)(Alert);
