import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

/**
 * 导航栏组件
 * 提供系统导航功能
 */
const Navbar = () => {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand href="#">健身数据分析系统</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#dashboard">仪表盘</Nav.Link>
            <Nav.Link href="#data">健身数据</Nav.Link>
            <Nav.Link href="#charts">数据图表</Nav.Link>
            <Nav.Link href="#add-data">添加数据</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
