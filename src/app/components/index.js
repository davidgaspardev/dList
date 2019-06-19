/**
 * Main 
 * 
 * @author David Gaspar
 * @flow
 */
import React, { Component } from 'react';
import type { Main as Props, Item as ItemType } from './Properties';
import type { Main as State } from './States';
import { StyleSheet, FlatList, View } from 'react-native';
import { Header } from './header';
import { AddItem, AddItemButton, Item } from './item';
import { getAllItems } from '../database/item';

/**
 * Stateful Component
 */
export default class Main extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        // Init state
        this.state = {
            visibleAddItem: false,
            items: []
        };

        // Bind context
        (this: any).showAddItem = this.showAddItem.bind(this);
        (this: any).closeAddItem = this.closeAddItem.bind(this);
    }

    render(): React$Element<any> {
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

    keyExtractor(item: ItemType): string {
        return item.id;
    }

    renderItem(info: { item: ItemType }): React$Element<any> {
        return <Item { ...info.item } />
    }

    componentDidMount(): void {
        this.setState({ items: getAllItems() });
    }

    showAddItem(): void {
        // Layout visible
        this.setState({
            visibleAddItem: true
        });
    }

    closeAddItem(): void {
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
const style: any = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
    }
});