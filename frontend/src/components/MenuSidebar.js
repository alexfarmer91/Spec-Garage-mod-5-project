import React from 'react';
import {NavLink} from 'react-router-dom'
import { Header, Icon, Image, Segment, Sidebar, Menu } from 'semantic-ui-react';

const MenuSidebar = (props) => {
//   const [visible, setVisible] = useBooleanKnob({ name: 'visible' })

    return(
    // <Sidebar as={Segment}>
        <Menu
        style={{float: 'left'}}
        as={Sidebar}
        // animation='overlay'
        // icon='labeled'
        // inverted
        // onHide={() => setVisible(false)}
        vertical
        visible={true}
        width='thin'
      >
        <Menu.Item as={NavLink} exact to='/'>
          <Icon name='home' />
          Home
        </Menu.Item>

        <Menu.Item as={NavLink} exact to='/discover'>
          <Icon name='coffee' />
          Discover
        </Menu.Item>

        {props.token? <Menu.Item as={NavLink} exact to='/profile'>
          <Icon name='cogs' />
          Profile
        </Menu.Item> : null}

        {
                props.currentUserCars.map(car => {
                 return (<Menu.Item key={car.id} as={NavLink} exact to={`/cars/${car.id}`}>
                 <Icon name='car' />
                 {car.year} {car.make} {car.model}
               </Menu.Item>)
                })
              }        
      </Menu>)

      {/* <Sidebar.Pusher>
        <Segment basic>
          <Header as='h3'>Application Content</Header>
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
      </Sidebar.Pusher> */}
    {/* </Sidebar> */}
    
}

export default MenuSidebar;
