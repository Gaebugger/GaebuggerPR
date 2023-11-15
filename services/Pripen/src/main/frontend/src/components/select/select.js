import React,{useEffect} from 'react';
import Select from 'react-select';

const options = [
  { value: '기재', label: '기재' },
  { value: '기재안함', label: '기재안함' }
];

const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 200,     // 이 값을 조정하여 원하는 너비로 설정하세요.
      minHeight: 5,  // 최소 높이 설정
    }),
  };

  function DropdownComponent({ onChange, value, options}) {
      // 컴포넌트가 마운트될 때 한 번만 실행
 
    return (
        <Select
            options={options}
            isSearchable={false}
            onChange={onChange}
            value={value}
            styles={customStyles}
        />
    );
}

export default DropdownComponent;
