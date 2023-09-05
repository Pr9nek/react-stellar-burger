import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

export default function Tabs() {
    const [current, setCurrent] = React.useState('one')
        
        return (
          <div style={{ display: 'flex' }}>
            <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
              Булки
            </Tab>
            <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
              Соусы
            </Tab>
            <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
              Начинки
            </Tab>
          </div>
        )
      }