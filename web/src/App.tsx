import { Box } from '@mui/material';
import InventoryComponent from './components/inventory';
import useNuiEvent from './hooks/useNuiEvent';
import { Items } from './store/items';
import { Locale } from './store/locale';
import { setImagePath } from './store/imagepath';
import { setupInventory } from './store/inventory';
import { Inventory } from './typings';
import { useAppDispatch } from './store';
import { debugData } from './utils/debugData';
import DragPreview from './components/utils/DragPreview';
import { fetchNui } from './utils/fetchNui';
import { useDragDropManager } from 'react-dnd';
import KeyPress from './components/utils/KeyPress';

debugData([
  {
    action: 'setupInventory',
    data: {
      leftInventory: {
        id: 'test',
        type: 'player',
        slots: 36,
        name: 'Bob Smith',
        weight: 30000,
        maxWeight: 250000,
        items: [
          {
            slot: 1,
            name: 'iron',
            label: 'iron',
            description: 'Generic item description',
            weight: 15000,
            count: 1,
            metadata: { meta: 'Generic item description2', durability: 0, type: 'Special', ammo: 3, mustard: '60%', ketchup: '30%', mayo: '10%' },
          },
          {
            slot: 2,
            name: 'water',
            description: 'Generic item description',
            weight: 5000,
            count: 1,
            metadata: { meta: 'Generic item description2', durability: 50, type: 'Special', ammo: 3, mustard: '60%', ketchup: '30%', mayo: '10%' },
          },
          {
            slot: 3,
            name: 'water',
            description: 'Generic item description',
            weight: 0,
            count: 1,
            metadata: { meta: 'Generic item description2', durability: 75, type: 'Special', ammo: 3, mustard: '60%', ketchup: '30%', mayo: '10%' },
          },
          {
            slot: 4,
            name: 'water',
            description: 'Generic item description',
            weight: 0,
            count: 1,
            metadata: { meta: 'Generic item description2', durability: 100, type: 'Special', ammo: 3, mustard: '60%', ketchup: '30%', mayo: '10%' },
          },
        ],
      },
      rightInventory: {
        id: 'shop',
        type: 'crafting',
        slots: 50,
        name: 'Bob Smith',
        weight: 3000,
        maxWeight: 5000,
        items: [
          {
            slot: 1,
            name: 'lockpick',
            weight: 2500,
            price: 300,
            ingredients: {
              iron: 5,
              copper: 12,
              powersaw: 0.1,
            },
            metadata: {
              description: 'Simple lockpick that breaks easily and can pick basic door locks',
            },
          },
        ],
      },
    },
  },
]);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const manager = useDragDropManager();

  useNuiEvent<{
    locale: { [key: string]: string };
    items: typeof Items;
    leftInventory: Inventory;
    imagepath: string;
  }>('init', ({ locale, items, leftInventory, imagepath }) => {
    for (const name in locale) Locale[name] = locale[name];
    for (const name in items) Items[name] = items[name];

    setImagePath(imagepath);
    dispatch(setupInventory({ leftInventory }));
  });

  fetchNui('uiLoaded', {});

  useNuiEvent('closeInventory', () => {
    manager.dispatch({ type: 'dnd-core/END_DRAG' });
  });

  return (
    <Box sx={{ height: '100%', width: '100%', color: 'white' }}>
      <InventoryComponent />
      <DragPreview />
      <KeyPress />
    </Box>
  );
};

export default App;
