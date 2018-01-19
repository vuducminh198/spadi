<template>
    <ul class="sidebar-menu">
        <li class="treeview">
            <a href="#">
                <i class="material-icons" style="vertical-align: middle">store_mall_directory</i>
                <span class="mtext">CỬA HÀNG</span>
                <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
            </a>
            <ul class="treeview-menu">
                <nuxt-link tag="li" class="pageLink" to="/quan-tri/shop/tao-moi">
                    <a>
                        <i class="fa"></i>
                        <span class="page">Thêm mới</span>
                    </a>
                </nuxt-link>
                <nuxt-link tag="li" class="pageLink" to="/quan-tri/shop/danh-sach">
                    <a>
                        <i class="fa"></i>
                        <span class="page">Danh sách cửa hàng</span>
                    </a>
                </nuxt-link>
            </ul>
        </li>
        <li class="treeview">
            <a href="#">
                <i class="material-icons">redeem</i>
                <span>DEAL</span>
                <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
            </a>
            <ul class="treeview-menu">
                <nuxt-link tag="li" class="pageLink" to="/quan-tri/deal/tao-moi">
                    <a>
                        <i class="fa "></i>
                        <span class="page">Thêm mới</span>
                    </a>
                </nuxt-link>
                <nuxt-link tag="li" class="pageLink" to="/quan-tri/deal/danh-sach">
                    <a>
                        <i class="fa"></i>
                        <span class="page">Danh sách Deal</span>
                    </a>
                </nuxt-link>
            </ul>
        </li>
        <li class="treeview">
            <a href="#">
                <i class="material-icons">toll</i>
                <span>COUPON</span>
                <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
            </a>
            <ul class="treeview-menu">
                <nuxt-link tag="li" class="pageLink" to="/quan-tri/coupon/tao-moi">
                    <a>
                        <i class="fa"></i>
                        <span class="page">Thêm mới</span>
                    </a>
                </nuxt-link>
                <nuxt-link tag="li" class="pageLink" to="/quan-tri/coupon/danh-sach">
                    <a>
                        <i class="fa"></i>
                        <span class="page">Danh sách Coupon</span>
                    </a>
                </nuxt-link>
            </ul>
        </li>
        <li class="treeview">
            <a href="#">
                <i class="material-icons">face</i>
                <span>KHÁCH HÀNG</span>
                <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
            </a>
            <ul class="treeview-menu">
                <nuxt-link tag="li" class="pageLink" to="/quan-tri/shop/tao-moi">
                    <a>
                        <i class="fa fa-cog"></i>
                        <span class="page">Thêm mới</span>
                    </a>
                </nuxt-link>
                <nuxt-link tag="li" class="pageLink" to="/quan-tri/shop/">
                    <a>
                        <i class="fa fa-cog"></i>
                        <span class="page">Danh sách Coupon</span>
                    </a>
                </nuxt-link>
            </ul>
        </li>
        <li class="treeview">
            <a href="#">
                <i class="material-icons">bubble_chart</i>
                <span>THỐNG KÊ</span>
                <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
            </a>
            <ul class="treeview-menu">
                <nuxt-link tag="li" class="pageLink" to="/quan-tri/shop/tao-moi">
                    <a>
                        <i class="fa fa-cog"></i>
                        <span class="page">Thêm mới</span>
                    </a>
                </nuxt-link>
                <nuxt-link tag="li" class="pageLink" to="/quan-tri/shop/">
                    <a>
                        <i class="fa fa-cog"></i>
                        <span class="page">Danh sách Coupon</span>
                    </a>
                </nuxt-link>
            </ul>
        </li>

    </ul>
</template>
<script>
    export default {
        name: 'SidebarName'
    }
</script>
<style>
    /* override default */
    .sidebar-menu > li > a {
        ptao-moiing: 12px 15px 12px 10px;
    }

    .sidebar-menu li.active > a > .fa-angle-left, .sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
        animation-name: rotate;
        animation-duration: .2s;
        animation-fill-mode: forwards;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(-90deg);
        }
    }
</style>
