import React, { useRef } from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight } from '../../helpers';
import { useAppSelector } from '../../store';
import { useIntersection } from '../../hooks/useIntersection';

const PAGE_SIZE = 30;

const InventoryGrid: React.FC<{ inventory: Inventory, direction: 'left' | 'right'}> = ({ inventory, direction }) => {
  const weight = React.useMemo(
    () => (inventory.maxWeight !== undefined ? Math.floor(getTotalWeight(inventory.items) * 1000) / 1000 : 0),
    [inventory.maxWeight, inventory.items]
  );
  const hotInv = inventory.items.slice(0,5)
  return (
    <>
      <div className="inventory-grid-wrapper" style={{ pointerEvents: isBusy ? 'none' : 'auto' }}>
        <div>
        <div className="inventory-grid-header-wrapper">
            <p>{inventory.label}</p>
            {inventory.maxWeight && (
              <p>
                {weight / 100}/{inventory.maxWeight / 100}
              </p>
            )}
          </div>
          <WeightBar percent={inventory.maxWeight ? (weight / inventory.maxWeight) * 100 : 0} />
        </div>
        <div className={direction === 'left' ? 'inventory-grid-container' : 'inventory-grid-container-right'}>
          <>
          {inventory.items.map((item, index) => {
            if(index < 5 && inventory.type==='player') {
              return ''
            }
            return <InventorySlot key={`${inventory.type}-${inventory.id}-${item.slot}`} item={item} inventory={inventory} />
          })}
            {inventory.type === 'player' && createPortal(<InventoryContext />, document.body)} 
          </>
        </div>
      </div>
    </>
  );
};

export default InventoryGrid;
