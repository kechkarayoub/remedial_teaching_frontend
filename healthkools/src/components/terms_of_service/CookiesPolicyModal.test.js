import React, { Component } from "react";
import { render, screen, act, fireEvent } from '@testing-library/react';
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

  test('Should close button calls onHide', async () => {
    const closeFn = jest.fn();
    await act(async () => {
      const { container } = render(<CookiesPolicyModal show={true} onHide={closeFn}/>);
      var close_btn_cpm = screen.getByTestId('close_btn_cpm');
      fireEvent.click(close_btn_cpm, {target: {}});
      expect(closeFn).toHaveBeenCalledTimes(1);
    });
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
    let nbr_items = 0;
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
      nbr_items++;
    });
    items.map(item_ => {
      let title_strings = split_html_string(item_.title[current_language]);
      title_strings.map(i_s => {
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
        nbr_items++;
      });
      if(item_.intro){
        let intro_strings = split_html_string(item_.intro[current_language]);
        intro_strings.map(i_s => {
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
          nbr_items++;
        });
      }
      item_.paragraphs && item_.paragraphs.map(p => {
        let p_strings = split_html_string(p[current_language]);
        p_strings.map(i_s => {
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
          nbr_items++;
        });
        p.list_items && p.list_items.map(il => {
          let il_strings = split_html_string(il[current_language]);
          il_strings.map(i_s => {
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
            nbr_items++;
          });
          il.sub_list_items && il.sub_list_items.map(sil => {
            let sil_strings = split_html_string(sil[current_language]);
            sil_strings.map(i_s => {
              let reg = new RegExp(i_s.replace("(", "").replace(")", ""));
              let item;
              try{
                item = screen.getAllByText(reg);
              }
              catch{
              }
              if(item){
                nbr_found++;
              }
              nbr_items++;
            });
          });
        });
      });
    })
    expect(nbr_found).toBeGreaterThan(nbr_items / 2);
  });
});
