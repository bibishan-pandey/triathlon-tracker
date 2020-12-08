import React, {Component} from "react";
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from "react-native";
import {AppLoading} from "expo";
import {fetchCalendarResults} from "../utils/api";
import {addEntry, receiveEntries} from "../store/actions/actionCreators";
import {getDailyReminderValue, timeToString} from "../utils/helpers";
import {Agenda as UdaciFitnessCalendar} from 'react-native-calendars'
import {white} from "../utils/colors";
import MetricCard from "./MetricCard";


class History extends Component {
    state = {
        ready: false,
        selectedDate: new Date().toISOString().slice(0,10),
    };

    componentDidMount() {
        const {dispatch} = this.props;
        fetchCalendarResults()
            .then(entries => dispatch(receiveEntries(entries)))
            .then(({entries}) => {
                if (!entries[timeToString()]) {
                    dispatch(addEntry({
                        [timeToString()]: getDailyReminderValue(),
                    }));
                }
            })
            .then(() => this.setState(() => ({
                ready: true,
            })));
    }

    renderItem = (dateKey, { today, ...metrics }, firstItemInDay) => (
        <View style={styles.item}>
            {today
                ? <View>
                    {/*<DateHeader date={formattedDate}/>*/}
                    <Text style={styles.noDataText}>
                        {today}
                    </Text>
                </View>
                : <TouchableOpacity onPress={() => this.props.navigation.navigate('Entry Detail',
                    { entryId: dateKey })}>
                    <MetricCard metrics={metrics}/>
                </TouchableOpacity>}
        </View>
    );

    renderEmptyDate = (formattedDate) => {
        return (
            <View style={styles.item}>
                {/*<DateHeader date={formattedDate}/>*/}
                <Text style={styles.noDataText}>You didn't log any data on this day</Text>
            </View>
        );
    };

    onDayPress = (day) => {
        this.setState({
            selectedDate: day.dateString
        })
    };

    render() {
        const {entries} = this.props;
        const {ready, selectedDate} = this.state;
        if(ready === false) {
            return <AppLoading/>;
        }
        return (
            <UdaciFitnessCalendar
                items={entries}
                onDayPress={this.onDayPress}
                renderItem={(item, firstItemInDay) => this.renderItem(selectedDate, item, firstItemInDay)}
                renderEmptyDate={this.renderEmptyDate}/>
        );
    }
}

function mapStateToProps(entries) {
    return {
        entries,
    };
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        paddingTop: 8,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
});

export default connect(mapStateToProps)(History);
