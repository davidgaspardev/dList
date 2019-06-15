/**
 * Main 
 * 
 * @author David Gaspar
 */
import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import Header from './Header';
import { AddItem, Item, AddItemButton } from './Item';
import { getAllItems } from '../database/item';

/**
 * Stateful Component
 */
export default class Main extends Component {

    constructor(props) {
        super(props);

        // Init state
        this.state = {
            visibleAddItem: false,
            items: []
        }

        // Bind context
        this.showAddItem = this.showAddItem.bind(this);
        this.closeAddItem = this.closeAddItem.bind(this);
    }

    distributingItems(list) {

    }

    render() {
        // Destructuring assignment
        const { showAddItem, closeAddItem, renderItem, keyExtractor } = this;
        const { visibleAddItem, items } = this.state;
        const { container } = style;

        // View
        return (
            <View style={container}>
                <Header eventShowAddItem={showAddItem} />
                { items.length > 0 && <FlatList data={items} renderItem={renderItem} keyExtractor={keyExtractor} /> }
                <AddItemButton eventShowAddItem={showAddItem} />
                { visibleAddItem && <AddItem eventCloseAddItem={closeAddItem} /> }
            </View>
        );
    }

    keyExtractor(item) {
        return item.id;
    }

    //renderSectionHeader({section: {title}}) {
        
    //}

    renderItem({item}) {
        return <Item { ...item } />
    }

    componentDidMount() {
        this.setState({ items: getAllItems() });
    }

    showAddItem() {
        // Layout visible
        this.setState({
            visibleAddItem: true
        });
    }

    closeAddItem() {
        // Layout invisible
        this.setState({
            visibleAddItem: false,
            // Items update
            items: getAllItems()
        });
    }
}

/**
 * Style Object
 */
const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
    }
});