import React from 'react';
import {NavLink} from 'react-router-dom'
import { Icon, Segment, Sidebar, Menu } from 'semantic-ui-react';

const MenuSidebar = (props) => {
//   const [visible, setVisible] = useBooleanKnob({ name: 'visible' })

    return(
    <Sidebar.Pushable as={Segment}>
        <Sidebar
        style={{float: 'left'}}
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
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
      </Sidebar>

      <Sidebar.Pusher>
        <Segment basic>
          {/* <Header as='h3'>Application Content</Header>
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
          {props.renderSwitchbox()}
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>)
    
}

export default MenuSidebar;
