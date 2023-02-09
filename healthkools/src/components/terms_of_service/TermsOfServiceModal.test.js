import React, { Component } from "react";
import { render, screen, act, fireEvent } from '@testing-library/react';
import TermsOfServiceModal from "components/terms_of_service/TermsOfServiceModal";
import { withRouter, Redirect } from "react-router-dom";
import moment from 'moment';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure, shallow } from 'enzyme'
import { unmountComponentAtNode } from "react-dom";
import { async } from "q";
import {get_data} from "components/terms_of_service/data";
import {get_articles} from "components/terms_of_service/terms_of_service";
import { get } from "services/storage";
import { split_html_string } from "utils/tests_utils";
configure({adapter: new Adapter()});

jest.mock('react-i18next', () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: (w) => w };
    return Component;
  },
}));
jest.mock('axios');
describe('TermsOfServiceModal component', () => {
  test('Should render without crash', async () => {
    render(<TermsOfServiceModal show={true} />);
  });

  test('Should close button calls onHide', async () => {
    const closeFn = jest.fn();
    await act(async () => {
      const { container } = render(<TermsOfServiceModal show={true} onHide={closeFn}/>);
      var close_btn_tsm = screen.getByTestId('close_btn_tsm');
      fireEvent.click(close_btn_tsm, {target: {}});
      expect(closeFn).toHaveBeenCalledTimes(1);
    });
  });

  test('Should contains terms of service data', async () => {
    let wrapper = mount(<TermsOfServiceModal show={true}/>);
    var current_language = get("current_language");
    var data = get_data();
    var articles = get_articles(data);
    expect(wrapper.find('.modal-body').length).toEqual(1);
    let nbr_found = 0;
    let nbr_items = 0;
    articles.map(article => {
      let title_strings = split_html_string(article.title[current_language]);
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
      if(article.intro){
        let intro_strings = split_html_string(article.intro[current_language]);
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
      article.paragraphs && article.paragraphs.map(p => {
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
