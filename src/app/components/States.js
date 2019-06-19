/**
 * States
 *
 * @author David Gaspar 
 * @flow
 */
import type { Item as ItemT } from './Properties';

export type Main = {
    visibleAddItem: boolean,
    items: Array<ItemT>
};

export type Item = {
    animation: any
};

export type AddItem = {
  showAnimation: boolean,
  targetAnimation: Object,
  name: string,
  price: string,
  quantity: number,
  unit: string,
  category: string
};