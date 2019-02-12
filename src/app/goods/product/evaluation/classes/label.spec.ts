import { TestBed, inject, async } from '@angular/core/testing';
import { Label, LabelData } from '../classes/label';

describe('Label', () => {
    let label: Label;
    let labeldata: LabelData[];

    beforeEach(() => {
        labeldata = [
            {id: '1', names: ['Good quality', '质量好']},
            {id: '2', names: ['Good Appearance', '外观好']},
            {id: '3', names: ['High intensity', '强度高']},
            {id: '4', names: ['Long Life', '寿命长']},
            {id: '5', names: ['Packaging good', '包装好']},
            {id: '6', names: ['Cost-effective', '性价比高']},
            {id: '7', names: ['Good color', '颜色好']},
            {id: '8', names: ['High-density', '密度高']},
              ];
        label = new Label(labeldata);
    });

    it('should be create', () => {
      expect(label).toBeTruthy();
      expect(label.data.length).toBe(labeldata.length);
    });

    it('function should have been called and return right value', () => {
      const item = label.find(3);
      expect(item.item).toBe(labeldata[2]);
      expect(item.value('names')[0]).toBe(labeldata[2].names[0]);

      expect(item.value('name')).not.toBeDefined();
      expect(item.value('')).not.toBeDefined();
      expect(item.value(null)).not.toBeDefined();
      expect(item.value(undefined)).not.toBeDefined();
    });
  });
