import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from "dat.gui";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

			let group;
			let container, stats;
			const particlesData = [];
			let camera, scene, renderer;
			let positions, colors;
			let particles;
			let pointCloud;
			let particlePositions;
			let linesMesh;

			const maxParticleCount = 1000;
			let particleCount = 500;
			const r = 800;
			const rHalf = r / 2;

			const effectController = {
				showDots: true,
				showLines: true,
				minDistance: 150,
				limitConnections: false,
				maxConnections: 20,
				particleCount: 500
			};

			init();
			animate();

			function initGUI() {

				const gui = new GUI();

				gui.add( effectController, 'showDots' ).onChange( function ( value ) {

					pointCloud.visible = value;

				} );
				gui.add( effectController, 'showLines' ).onChange( function ( value ) {

					linesMesh.visible = value;

				} );
				gui.add( effectController, 'minDistance', 10, 300 );
				gui.add( effectController, 'limitConnections' );
				gui.add( effectController, 'maxConnections', 0, 30, 1 );
				gui.add( effectController, 'particleCount', 0, maxParticleCount, 1 ).onChange( function ( value ) {

					particleCount = parseInt( value );
					particles.setDrawRange( 0, particleCount );

				} );

			}

			function init() {

				initGUI();

				container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
				camera.position.z = 1750;

				const controls = new OrbitControls( camera, container );
				controls.minDistance = 1000;
				controls.maxDistance = 3000;

				scene = new THREE.Scene();


				group = new THREE.Group();
				scene.add( group );

			

				const segments = maxParticleCount * maxParticleCount;

				positions = new Float32Array( segments * 3 );
				colors = new Float32Array( segments * 3 );

				const pMaterial = new THREE.PointsMaterial( {
					color: 0xFF0000,
					size: 3,
					blending: THREE.AdditiveBlending,
					transparent: true,
					sizeAttenuation: false
				} );

				particles = new THREE.BufferGeometry();
				particlePositions = new Float32Array( maxParticleCount * 3 );

				for ( let i = 0; i < maxParticleCount; i ++ ) {

					const x = Math.random() * r - r / 2;
					const y = Math.random() * r - r / 2;
					const z = Math.random() * r - r / 2;

					particlePositions[ i * 3 ] = x;
					particlePositions[ i * 3 + 1 ] = y;
					particlePositions[ i * 3 + 2 ] = z;

					// add it to the geometry
					particlesData.push( {
						velocity: new THREE.Vector3( - 1 + Math.random() * 2, - 1 + Math.random() * 2, - 1 + Math.random() * 2 ),
						numConnections: 0
					} );

				}

				particles.setDrawRange( 0, particleCount );
				particles.setAttribute( 'position', new THREE.BufferAttribute( particlePositions, 3 ).setUsage( THREE.DynamicDrawUsage ) );

				// create the particle system
				pointCloud = new THREE.Points( particles, pMaterial );
				group.add( pointCloud );

				const geometry = new THREE.BufferGeometry();

				geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ).setUsage( THREE.DynamicDrawUsage ) );
				geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ).setUsage( THREE.DynamicDrawUsage ) );

				geometry.computeBoundingSphere();

				geometry.setDrawRange( 0, 0 );

				const material = new THREE.LineBasicMaterial( {
					vertexColors: true,
					blending: THREE.AdditiveBlending,
					transparent: true
				} );

				linesMesh = new THREE.LineSegments( geometry, material );
				group.add( linesMesh );

				//

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );

				container.appendChild( renderer.domElement );

				//

				stats = new Stats();
				container.appendChild( stats.dom );

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				let vertexpos = 0;
				let colorpos = 0;
				let numConnected = 0;

				for ( let i = 0; i < particleCount; i ++ )
					particlesData[ i ].numConnections = 0;

				for ( let i = 0; i < particleCount; i ++ ) {

					// get the particle
					const particleData = particlesData[ i ];

					particlePositions[ i * 3 ] += particleData.velocity.x;
					particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
					particlePositions[ i * 3 + 2 ] += particleData.velocity.z;

					if ( particlePositions[ i * 3 + 1 ] < - rHalf || particlePositions[ i * 3 + 1 ] > rHalf )
						particleData.velocity.y = - particleData.velocity.y;

					if ( particlePositions[ i * 3 ] < - rHalf || particlePositions[ i * 3 ] > rHalf )
						particleData.velocity.x = - particleData.velocity.x;

					if ( particlePositions[ i * 3 + 2 ] < - rHalf || particlePositions[ i * 3 + 2 ] > rHalf )
						particleData.velocity.z = - particleData.velocity.z;

					if ( effectController.limitConnections && particleData.numConnections >= effectController.maxConnections )
						continue;

					// Check collision
					for ( let j = i + 1; j < particleCount; j ++ ) {

						const particleDataB = particlesData[ j ];
						if ( effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
							continue;

						const dx = particlePositions[ i * 3 ] - particlePositions[ j * 3 ];
						const dy = particlePositions[ i * 3 + 1 ] - particlePositions[ j * 3 + 1 ];
						const dz = particlePositions[ i * 3 + 2 ] - particlePositions[ j * 3 + 2 ];
						const dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

						if ( dist < effectController.minDistance ) {

							particleData.numConnections ++;
							particleDataB.numConnections ++;

							const alpha = 1.0 - dist / effectController.minDistance;

							positions[ vertexpos ++ ] = particlePositions[ i * 3 ];
							positions[ vertexpos ++ ] = particlePositions[ i * 3 + 1 ];
							positions[ vertexpos ++ ] = particlePositions[ i * 3 + 2 ];

							positions[ vertexpos ++ ] = particlePositions[ j * 3 ];
							positions[ vertexpos ++ ] = particlePositions[ j * 3 + 1 ];
							positions[ vertexpos ++ ] = particlePositions[ j * 3 + 2 ];

							colors[ colorpos ++ ] = alpha;
							colors[ colorpos ++ ] = alpha;
							colors[ colorpos ++ ] = alpha;

							colors[ colorpos ++ ] = alpha;
							colors[ colorpos ++ ] = alpha;
							colors[ colorpos ++ ] = alpha;

							numConnected ++;

						}

					}

				}


				linesMesh.geometry.setDrawRange( 0, numConnected * 2 );
				linesMesh.geometry.attributes.position.needsUpdate = true;
				linesMesh.geometry.attributes.color.needsUpdate = true;

				pointCloud.geometry.attributes.position.needsUpdate = true;

				requestAnimationFrame( animate );

				stats.update();
				render();

			}

			function render() {

				const time = Date.now() * 0.001;

				group.rotation.y = time * 0.1;
				renderer.render( scene, camera );

			}
