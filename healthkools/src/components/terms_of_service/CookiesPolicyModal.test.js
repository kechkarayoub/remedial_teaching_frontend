import React, { Component } from "react";
import { render, screen, act } from '@testing-library/react';
import CookiesPolicyModal from "./CookiesPolicyModal";
import { withRouter, Redirect } from "react-router-dom";
import moment from 'moment';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure, shallow } from 'enzyme'
import { unmountComponentAtNode } from "react-dom";
import { async } from "q";
import {get_data} from "./data";
import {get_intro_items} from "./cookies_policy";
import { get } from "../../services/storage";
import { remove_html_tags_from_string, split_html_string } from "../../utils/tests_utils";
configure({adapter: new Adapter()});

jest.mock('react-i18next', () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
    return Component;
  },
}));
jest.mock('axios');
describe('CookiesPolicyModal component', () => {
  test('Should render without crash', async () => {
    render(<CookiesPolicyModal show={true} />);
  });
  test('Should contains cookies policy data', async () => {
    let wrapper = mount(<CookiesPolicyModal show={true}/>);
    var current_language = get("current_language");
    var data = get_data();
    var intro_items = get_intro_items(data);
    var intro = intro_items.intro;
    var items = intro_items.items;
    expect(wrapper.find('.modal-body').length).toEqual(1);
    let item_strings = split_html_string(intro[current_language]);
    let nbr_found = 0;
    item_strings.map(i_s => {
      let reg = new RegExp(i_s);
      let item;
      try{
        item = screen.getAllByText(reg);
      }
      catch{
      }
      if(item){
        nbr_found++;
      }
    });
    expect(nbr_found).toBeGreaterThan(0);
    items.map(item => {
      let title_strings = split_html_string(item.title[current_language]);
      let title_nbr_found = 0;
      title_strings.map(i_s => {
        let reg = new RegExp(i_s);
        let item;
        try{
          item = screen.getAllByText(reg);
        }
        catch{
        }
        if(item){
          title_nbr_found++;
        }
      });
      expect(title_nbr_found).toBeGreaterThan(0);
      let intro_strings = split_html_string(item.intro[current_language]);
      let intro_nbr_found = 0;
      intro_strings.map(i_s => {
        let reg = new RegExp(i_s);
        let item;
        try{
          item = screen.getAllByText(reg);
        }
        catch{
        }
        if(item){
          intro_nbr_found++;
        }
      });
      expect(intro_nbr_found).toBeGreaterThan(0);
      item.paragraphs && item.paragraphs.map(p => {
        let p_strings = split_html_string(p[current_language]);
        let p_nbr_found = 0;
        p_strings.map(i_s => {
          let reg = new RegExp(i_s);
          let item;
          try{
            item = screen.getAllByText(reg);
          }
          catch{
          }
          if(item){
            p_nbr_found++;
          }
        });
        p.list_items && p.list_items.map(il => {
          let il_strings = split_html_string(il[current_language]);
          let il_nbr_found = 0;
          il_strings.map(i_s => {
            let reg = new RegExp(i_s);
            let item;
            try{
              item = screen.getAllByText(reg);
            }
            catch{
            }
            if(item){
              il_nbr_found++;
            }
          });
          expect(il_nbr_found).toBeGreaterThan(0);
        });
        expect(p_nbr_found).toBeGreaterThan(0);
      });
    })
  });
});
