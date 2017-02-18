export function getPageData() {
  let data = {
    currentMenuIndex: 0,
    slideMenuToggleState: true,
    slideListData: [
      {
        id: 1,
        name: '基本元素',
        isActive: false,
        icon: 'cubes',
        childNodes: [
          {
            id: 11,
            name: '按钮',
            isActive: false,
            icon: 'archive',
            routename: 'btn'
          },
          {
            id: 12,
            name: '表单',
            isActive: false,
            icon: 'bug',
            routename: 'form'
          },
          {
            id: 13,
            name: '表格',
            isActive: false,
            icon: 'bookmark',
            routename: 'grid'
          },
          {
            id: 14,
            name: '导航',
            isActive: false,
            icon: 'book',
            routename: 'guider'
          },
          {
            id: 16,
            name: 'Tab选项卡',
            isActive: false,
            icon: 'reorder',
            routename: 'tab'
          },
          {
            id: 17,
            name: '辅助性元素',
            isActive: false,
            icon: 'folder',
            routename: 'other'
          }
        ]
      },
      {
        id: 2,
        name: '组件',
        isActive: false,
        icon: 'gift',
        childNodes: [
          {
            id: 18,
            name: 'DataTable',
            isActive: false,
            icon: 'folder',
            routename: 'table'
          },
          {
            id: 19,
            name: 'Navbar组件',
            isActive: false,
            icon: 'location-arrow',
            routename: 'navbar'
          },
          {
            id: 20,
            name: 'Laytpl + Laypage',
            isActive: false,
            icon: 'power-off',
            routename: 'laytpl'
          }
        ]
      },
      {
        id: 3,
        name: '第三方组件',
        isActive: false,
        icon: 'book',
        childNodes: [
          {
            id: 21,
            name: 'iCheck 组件',
            isActive: false,
            icon: 'file',
            routename: 'icheck'
          }
        ]
      },
      {
        id: 4,
        name: '地址本',
        isActive: false,
        icon: 'address-book',
        childNodes: [
          {
            id: 22,
            name: 'github',
            isActive: false,
            icon: 'github',
            routename: 'github'
          }
        ]
      }
      // {
      //   id: 5,
      //   name: '一级导航',
      //   isActive: false,
      //   icon: 'stop-circle',
      //   childNodes: false,
      //   routename: 'readme'
      // }
    ],
    navListData: [
       {
        id: 1,
        title: '首页',
        icon: 'home',
        isActive: true,
        routename: 'home'
      }
    ]
  }
  return data
}
