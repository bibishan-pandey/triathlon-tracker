import React, {Component} from "react";
import {connect} from 'react-redux';
import {View, Text} from "react-native";
import {fetchCalendarResults} from "../utils/api";
import {addEntry, receiveEntries} from "../store/actions/actionCreators";
import {getDailyReminderValue, timeToString} from "../utils/helpers";
import {Agenda as UdaciFitnessCalendar } from 'react-native-calendars'


class History extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        fetchCalendarResults()
            .then(entries => dispatch(receiveEntries(entries)))
            .then(({entries}) => {
                if(!entries[timeToString()]) {
                    dispatch(addEntry({
                        [timeToString()]: getDailyReminderValue(),
                    }));
                }
            });
    }

    renderItem = ({today, ...metrics}, formattedDate, key) => (
        <View>
            {today
                ? <Text>{JSON.stringify(today)}</Text>
                : <Text>{JSON.stringify(metrics)}</Text>}
        </View>
    );

    renderEmptyDate = (formattedDate) => {
        return (
            <View>
                <Text>No data for this day</Text>
            </View>
        );
    };

    render() {
        const {entries} = this.props;
        return (
            // <View>
                <UdaciFitnessCalendar
                    items={entries}
                    renderItem={this.renderItem}
                    renderEmptyDate={this.renderEmptyDate}/>
            // </View>
        );
    }
}

function mapStateToProps(entries) {
    return {
        entries,
    };
}

export default connect(mapStateToProps)(History);
