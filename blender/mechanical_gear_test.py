import bpy
import math
import os

# MADI Video Factory - Blender headless gear-pair pipeline validation.
# This is a visual pipeline test, not an engineering-grade involute gear model.

OUT = os.path.abspath("output")
os.makedirs(OUT, exist_ok=True)

bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)

scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE_NEXT" if "BLENDER_EEVEE_NEXT" in bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items.keys() else "BLENDER_EEVEE"
scene.render.resolution_x = 960
scene.render.resolution_y = 540
scene.render.resolution_percentage = 100
scene.render.fps = 30
scene.render.image_settings.file_format = "PNG"
scene.render.film_transparent = False
scene.world.color = (0.055, 0.055, 0.055)
scene.view_settings.view_transform = "AgX" if hasattr(scene.view_settings, "view_transform") else "Standard"

def material(name, color, metallic=0.0, roughness=0.35):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*color, 1)
    m.use_nodes = True
    bs = m.node_tree.nodes.get("Principled BSDF")
    bs.inputs["Base Color"].default_value = (*color, 1)
    bs.inputs["Metallic"].default_value = metallic
    bs.inputs["Roughness"].default_value = roughness
    return m

steel = material("Machined steel", (0.28, 0.34, 0.40), 0.88, 0.24)
dark = material("Graphite housing", (0.035, 0.05, 0.065), 0.65, 0.3)
brass = material("Fastener brass", (0.55, 0.32, 0.09), 0.8, 0.23)
floor_mat = material("Studio floor", (0.018, 0.025, 0.035), 0.15, 0.48)

def bevel(obj, amount=0.035, segments=3):
    mod = obj.modifiers.new("Machined edge bevel", "BEVEL")
    mod.width = amount
    mod.segments = segments
    obj.modifiers.new("Weighted corner normals", "WEIGHTED_NORMAL")

def cylinder(name, radius, depth, loc, mat, vertices=96, axis_y=False):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=loc)
    obj = bpy.context.object
    obj.name = name
    if axis_y:
        obj.rotation_euler[0] = math.radians(90)
    obj.data.materials.append(mat)
    bevel(obj, min(0.035, depth * 0.15))
    return obj

def gear(name, teeth, module, x, z, thickness, mat):
    root = module * teeth * 0.5 - 1.25 * module
    outer = module * teeth * 0.5 + module
    pitch = module * teeth * 0.5
    pts = []
    # Stylized tooth profile for pipeline validation; BMECH will supply production geometry.
    for i in range(teeth):
        a = 2 * math.pi * i / teeth
        seq = [(-0.50, root), (-0.34, root), (-0.22, outer), (0.22, outer), (0.34, root), (0.50, root)]
        for frac, rad in seq:
            ang = a + frac * (2 * math.pi / teeth)
            pts.append((x + rad * math.cos(ang), z + rad * math.sin(ang)))
    n = len(pts)
    verts = [(px, -thickness/2, pz) for px, pz in pts] + [(px, thickness/2, pz) for px, pz in pts]
    faces = [tuple(range(n)), tuple(range(n, 2*n))]
    for i in range(n):
        j = (i + 1) % n
        faces.append((i, j, j+n, i+n))
    mesh = bpy.data.meshes.new(name + " mesh")
    mesh.from_pydata(verts, [], faces)
    mesh.materials.append(mat)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    bevel(obj, 0.025, 3)
    obj["tooth_count"] = teeth
    obj["pitch_radius"] = pitch
    return obj

module = 0.18
teeth_a, teeth_b = 24, 16
pitch_a, pitch_b = module * teeth_a / 2, module * teeth_b / 2
center = pitch_a + pitch_b
xa, xb = -center/2, center/2

# Mounting plate and bearing blocks
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0.15, -2.48))
base = bpy.context.object
base.name = "Heavy mounting base"
base.dimensions = (6.4, 1.15, 0.24)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
base.data.materials.append(dark)
bevel(base, 0.10, 4)
for x, r in [(xa, 0.43), (xb, 0.34)]:
    cylinder("Bearing pedestal", r, 0.48, (x, 0.05, -2.22), dark)
    cylinder("Bearing outer race", r*0.67, 0.12, (x, -0.23, 0), brass, axis_y=True)
    cylinder("Bearing inner race", r*0.43, 0.14, (x, -0.31, 0), steel, axis_y=True)
    cylinder("Shaft", 0.13, 0.75, (x, -0.05, 0), steel, axis_y=True)

g1 = gear("Drive gear - 24T", teeth_a, module, xa, 0, 0.34, steel)
g2 = gear("Driven gear - 16T", teeth_b, module, xb, 0, 0.34, brass)

# Hubs sit on the visible front face.
for x, rad in [(xa, 0.36), (xb, 0.27)]:
    cylinder("Gear hub", rad, 0.20, (x, -0.28, 0), steel, axis_y=True)
    cylinder("Hub cap", rad*0.55, 0.08, (x, -0.40, 0), brass, axis_y=True)

# Studio ground
bpy.ops.mesh.primitive_plane_add(size=200, location=(0, 0, -2.62))
plane = bpy.context.object
plane.name = "Studio ground"
plane.data.materials.append(floor_mat)

# Camera and lighting
bpy.ops.object.camera_add(location=(0, -10.8, 7.2))
cam = bpy.context.object
cam.name = "Product camera"
target = (0, 0, 0)
cam.rotation_euler = (math.radians(32), 0, 0)
# Track camera toward the mechanism.
from mathutils import Vector
cam.rotation_euler = (Vector(target) - cam.location).to_track_quat("-Z", "Y").to_euler()
cam.data.type = "ORTHO"
cam.data.ortho_scale = 9.2
scene.camera = cam

def area_light(name, loc, power, size, color):
    bpy.ops.object.light_add(type="AREA", location=loc)
    lamp = bpy.context.object
    lamp.name = name
    lamp.data.energy = power
    lamp.data.shape = "DISK"
    lamp.data.size = size
    lamp.data.color = color
    lamp.rotation_euler = (Vector((0,0,0)) - lamp.location).to_track_quat("-Z", "Y").to_euler()

area_light("Key softbox", (0, -5, 7), 1500, 6, (0.78, 0.88, 1.0))
area_light("Warm rim", (4, 1, 4), 1100, 4, (1.0, 0.68, 0.38))
area_light("Fill", (-5, -2, 1), 800, 5, (0.55, 0.7, 1.0))

scene.render.image_settings.file_format = "PNG"
scene.render.filepath = os.path.join(OUT, "madi-gear-test.png")
scene.frame_set(1)
bpy.ops.render.render(write_still=True)

# Animate physically matched angular speed ratio, opposite directions.
scene.frame_start = 1
scene.frame_end = 180
for obj, end_angle in [(g1, 2*math.pi), (g2, -2*math.pi*teeth_a/teeth_b)]:
    obj.rotation_mode = "XYZ"
    obj.rotation_euler[1] = 0
    obj.keyframe_insert(data_path="rotation_euler", frame=1, index=1)
    obj.rotation_euler[1] = end_angle
    obj.keyframe_insert(data_path="rotation_euler", frame=180, index=1)
    if obj.animation_data and obj.animation_data.action:
        for fc in obj.animation_data.action.fcurves:
            for key in fc.keyframe_points:
                key.interpolation = "LINEAR"

scene.render.image_settings.file_format = "PNG"
scene.render.filepath = os.path.join(OUT, "frame_")
scene.render.resolution_percentage = 60
bpy.ops.render.render(animation=True)
