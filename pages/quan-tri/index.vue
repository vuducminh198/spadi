<template>
    <div>
        <header class="main-header">
	<span class="logo-mini">
		<a href="/"><img src="/static/img/copilot-logo-white.svg" alt="Logo"
                         class="img-responsive center-block logo"></a>
	</span>
            <nav class="navbar navbar-fixed-top" role="navigation">
                <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span class="sr-only">Toggle navigation</span>
                </a>
                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <li class="dropdown messages-menu">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-envelope-o"></i>
                                <span class="label label-success"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="header">You have message(s)</li>
                                <li>
                                    <ul class="menu">
                                        <li>
                                            <!-- start message -->
                                            <a href="javascript:;">
                                                <h4>
                                                    <small>
                                                        <i class="fa fa-clock-o"></i> 5 mins
                                                    </small>
                                                </h4>
                                                <p>Why not consider this a test message?</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="footer">
                                    <a href="javascript:;">See All Messages</a>
                                </li>
                            </ul>
                        </li>

                        <li class="dropdown notifications-menu">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-bell-o"></i>
                                <span class="label label-warning"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="header">You have notification(s)</li>
                                <li>
                                    <!-- Inner Menu: contains the notifications -->
                                    <ul class="menu">
                                        <li>
                                            <!-- start notification -->
                                            <a href="javascript:;">
                                                <i class="fa fa-users text-aqua"></i> 5 new members joined today
                                            </a>
                                        </li>
                                        <!-- end notification -->
                                    </ul>
                                </li>
                                <li class="footer">
                                    <a href="javascript:;">View all</a>
                                </li>
                            </ul>
                        </li>

                        <!-- Tasks Menu -->
                        <li class="dropdown tasks-menu">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-flag-o"></i>
                                <span class="label label-danger"> </span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="header">You have task(s)</li>
                                <li>
                                    <!-- Inner menu: contains the tasks -->
                                    <ul class="menu">
                                        <li>
                                            <!-- Task item -->
                                            <a href="javascript:;">
                                                <!-- Task title and progress text -->
                                                <h3>
                                                    Design some buttons
                                                    <small class="pull-right">20%</small>
                                                </h3>
                                                <!-- The progress bar -->
                                                <div class="progress xs">
                                                    <!-- Change the css width attribute to simulate progress -->
                                                    <div class="progress-bar progress-bar-aqua" style="width: 20%"
                                                         role="progressbar" aria-valuenow="20" aria-valuemin="0"
                                                         aria-valuemax="100">
                                                        <span class="sr-only">20% Complete</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <!-- end task item -->
                                    </ul>
                                </li>
                                <li class="footer">
                                    <a href="javascript:;">View all tasks</a>
                                </li>
                            </ul>
                        </li>

                        <!-- User Account Menu -->
                        <li class="dropdown user user-menu">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                                <!-- The user image in the navbar-->
                                <img class="user-image" alt="User Image">
                                <!-- hidden-xs hides the username on small devices so only the image appears. -->
                                <span class="hidden-xs">Vũ Đức Minh</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <!-- Left side column. contains the logo and sidebar -->
        <sidebar/>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper" style="padding:10px;">
            <section class="content-header" >
                <h1>

                    <small></small>
                </h1>
                <ol class="breadcrumb">

                </ol>
            </section>
            <nuxt-child></nuxt-child>
        </div>
        <!-- /.content-wrapper -->

        <!-- Main Footer -->
        <footer class="main-footer">
            <strong>Copyright &copy; 2018}}
                <a href="javascript:;">Hoàng Thiên Lộc</a>.</strong> All rights reserved.
        </footer>
    </div>
    <!-- ./wrapper -->
</template>

<script>
    import sidebar from '~/components/Sidebar.vue'

    export default {

        components: {
            'sidebar': sidebar
        },
        head: {
            bodyAttrs: {
                class: 'hold-transition skin-blue sidebar-mini'
            }
        }
    }
</script>

<style lang="scss">
    .wrapper.fixed_layout {
        .main-header {
            position: fixed;
            width: 100%;
        }

        .content-wrapper {
            padding-top: 50px;
        }

        .main-sidebar {
            position: fixed;
            height: 100vh;
        }
    }

    .wrapper.hide_logo {
        @media (max-width: 767px) {
            .main-header .logo {
                display: none;
            }
        }
    }
    @media (max-width: 768px){
        .content-header{
            display: none;
        }
    }

    .logo-mini,
    .logo-lg {
        text-align: left;

        img {
            padding: .4em !important;
        }
    }

    .logo-lg {
        img {
            display: -webkit-inline-box;
            width: 25%;
        }
    }

    .user-panel {
        height: 4em;
    }

    hr.visible-xs-block {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.17);
        height: 1px;
        border-color: transparent;
    }
</style>
