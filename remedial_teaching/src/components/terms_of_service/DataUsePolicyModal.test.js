import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from "react";
import DataUsePolicyModal from "components/terms_of_service/DataUsePolicyModal";
import { act, fireEvent, render, screen } from '@testing-library/react';
import { configure, mount } from 'enzyme';
import { get } from "services/storage";
import { get_data } from "components/terms_of_service/data";
import { get_intro_items } from "components/terms_of_service/data_use_policy";
import { split_html_string } from "utils/tests_utils";

configure({adapter: new Adapter()});

jest.mock('react-i18next', () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
    return Component;
  },
}));

jest.mock('axios');

describe('DataUsePolicyModal component', () => {
  test('Should render without crash', async () => {
    render(<DataUsePolicyModal show={true} />);
  });

  test('Should close button calls onHide', async () => {
    const closeFn = jest.fn();
    await act(async () => {
      const { container } = render(<DataUsePolicyModal show={true} onHide={closeFn}/>);
      var close_btn_dupm = screen.getByTestId('close_btn_dupm');
      fireEvent.click(close_btn_dupm, {target: {}});
      expect(closeFn).toHaveBeenCalledTimes(1);
    });
  });
  
  test('Should contains data use policy data', async () => {
    let wrapper = mount(<DataUsePolicyModal show={true}/>);
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
    items.map(item_ => {
      let title_strings = split_html_string(item_.title[current_language]);
      title_strings.map(i_s => {
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
      if(item_.intro){
        let intro_strings = split_html_string(item_.intro[current_language]);
        intro_strings.map(i_s => {
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
      }
      item_.paragraphs && item_.paragraphs.map(p => {
        let p_strings = split_html_string(p[current_language]);
        p_strings.map(i_s => {
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
        p.list_items && p.list_items.map(il => {
          let il_strings = split_html_string(il[current_language]);
          il_strings.map(i_s => {
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
